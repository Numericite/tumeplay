import React, { useState, useEffect, useContext } from "react";
import Table from "../../components/Table";
import OrdersAPI from "../../services/api/orders";
import AppContext from "../../AppContext";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Dropdown from "react-dropdown";
import ConfirmModal from "../../components/ui/ConfirmModal";
import UpdateOrderContentModal from "../../components/ui/UpdateOrderContentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUndo } from "@fortawesome/free-solid-svg-icons";
import getAllBoxes from "../../services/api/boxes.js";
import ReferentAPI from "../../services/api/referents.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const OrdersLogistics = () => {
  const context = useContext(AppContext);
  const { token, user } = context;

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState({});
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [tmpSelectedItems, setTmpSelectedItems] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateOrderContent, setShowUpdateOrderContent] = useState(false);

  const defaultParams = {
    referent_ne: user.referent,
    _sort: "created_at:DESC",
  };

  const dataToDisplay = {
    headers: [
      { name: "ID", fieldName: "id" },
      { name: "Date", fieldName: "created_at" },
      { name: "Prénom", fieldName: "first_name" },
      { name: "Téléphone", fieldName: "phone" },
      { name: "Box", fieldName: "box_name" },
      { name: "Référent", fieldName: "referent_name" },
      { name: "Actions", fieldName: "actions" },
    ],
    items: orders,
  };

  const dropdownOptions = [
    "5",
    "10",
    "50",
    "100",
    { value: orders.length, label: "Tout" },
  ];

  const updateOrderReferent = async (order) => {
    order.referent = user.referent;
    await OrdersAPI.update(token, order);
    retrieveOrders(defaultParams);
  };

  const searchOrders = (query) => {
    retrieveOrders(
      Object.assign(
        {
          _q: query,
        },
        defaultParams
      )
    );
  };

  const retrieveOrders = async (params) => {
    let response = await ReferentAPI.findOne(token, { id: user.referent });
    const referent = response.data;

    if (referent.region) {
      params["referent.region.id"] = referent.region.id;
    }

    response = await OrdersAPI.countDeliveryOrders(
      token,
      Object.assign(
        {
          environnement: referent.environnement.id,
        },
        params
      )
    );
    setCount(response.data);

    response = await OrdersAPI.getDeliveryOrders(
      token,
      Object.assign(
        {
          _limit: numberPerPage,
          _start: numberPerPage * (currentPage - 1),
          environnement: referent.environnement.id,
        },
        params
      )
    );
    let orders = response.data;
    orders.map((order) => {
      order.selected = false;
      order.box_name =
        order.content[0].__component === "commandes.box"
          ? order.content[0].box.title
          : "Box sur mesure";
      order.referent_name = order.referent.name;
      order.actions = (
        <div className="tmp-table-actions">
          <button
            onClick={() => {
              confirmAlert({
                title: "Confirmation",
                message: `Êtes vous sûr de vouloir reprendre la commande ${order.id} ?`,
                buttons: [
                  {
                    label: "Oui",
                    onClick: () => updateOrderReferent(order),
                  },
                  {
                    label: "Non",
                  },
                ],
              });
            }}
            className="tmp-button"
          >
            <FontAwesomeIcon icon={faUndo} color="white" className="mr-2" />{" "}
            Récupérer la commande
          </button>
          <button
            onClick={() => {
              setCurrentOrder(order);
              setShowUpdateOrderContent(true);
            }}
            className="tmp-button"
          >
            <FontAwesomeIcon icon={faEye} color="white" className="mr-2" /> Voir
          </button>
        </div>
      );
    });
    setOrders(orders);
  };

  const retrieveBoxes = async () => {
    let response = await ReferentAPI.findOne(token, { id: user.referent });
    const referent = response.data;
    response = await getAllBoxes(token, referent.environnement.slug);
    setBoxes(response.data);
  };

  const handleChangeNumPerPage = (e) => {
    setTmpSelectedItems([]);
    setNumberPerPage(parseInt(e.value));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      orders.forEach((order) => (order.selected = e.target.checked));
      setTmpSelectedItems([...orders]);
    } else {
      orders.forEach((order) => (order.selected = e.target.checked));
      setTmpSelectedItems([]);
    }
  };

  const handleSpecificSelection = (e) => {
    let order = orders.find((order) => order.id === parseInt(e.target.id));
    if (e.target.checked) {
      order.selected = e.target.checked;
      tmpSelectedItems.push(order);
      setTmpSelectedItems([...tmpSelectedItems]);
    } else {
      order.selected = false;
      let array = tmpSelectedItems.filter((item) => item.id !== order.id);
      setTmpSelectedItems([...array]);
    }
  };

  const onPageChange = (event) => {
    setCurrentPage(event);
  };

  // const handleSendClick = async (e) => {
  //   e.preventDefault();
  //   let ordersToSend = tmpSelectedItems.map((item) => {
  //     item.received = true;
  //     item.date_received = new Date();
  //     return item;
  //   });
  //   const res = await OrdersAPI.bulkUpdate(token, ordersToSend);
  //   if (res.status === 200) {
  //     setShowConfirm(true);
  //   }
  // };

  useEffect(() => {
    retrieveBoxes();
    retrieveOrders(defaultParams);
  }, []);

  useEffect(() => {
    retrieveOrders(defaultParams);
    setTmpSelectedItems([]);
  }, [currentPage, numberPerPage]);

  return (
    <>
      <div className="px-4 relative">
        <div className="text-white text-sm uppercase hidden lg:inline-block font-semibold mb-8">
          Vos commandes
        </div>
        <div
          className={`fixed ${
            showConfirm ? "block" : "hidden"
          } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
        >
          {showConfirm && <ConfirmModal setShow={setShowConfirm} />}
        </div>
        <div
          className={`fixed ${
            showUpdateOrderContent ? "block" : "hidden"
          } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
        >
          {showUpdateOrderContent && (
            <UpdateOrderContentModal
              readOnly
              closeModal={() => {
                setShowUpdateOrderContent(false);
                retrieveOrders(defaultParams);
              }}
              boxes={boxes}
              order={currentOrder}
            />
          )}
        </div>
        <div className="tmp-table-option">
          <div className="tmp-top-buttons-container" />
          <div className="tmp-dropdown-container">
            <Dropdown
              className="tmp-dropdown"
              menuClassName="tmp-dropdown-menu"
              options={dropdownOptions}
              onChange={(e) => handleChangeNumPerPage(e)}
              value={numberPerPage.toString()}
            />
          </div>
        </div>
        <Table
          dataToDisplay={dataToDisplay}
          handleSpecificSelection={handleSpecificSelection}
          handleSelectAll={handleSelectAll}
          search={searchOrders}
          title="Les commandes des autres référents"
        />
        <div className="tmp-pagination-container">
          <Pagination
            currentPage={currentPage}
            totalSize={count}
            sizePerPage={numberPerPage}
            numberOfPagesNextToActivePage={3}
            changeCurrentPage={(event) => onPageChange(event)}
            theme="border-bottom"
          />
        </div>
      </div>
    </>
  );
};

export default OrdersLogistics;
