'use strict';

const _ = require('lodash');
const EMAIL_ORDER_CONFIRM = {
  subject: 'Commande effectuée ✔',
  text: `
    Bonjour <%= order.first_name %>,\n
    Votre commande a bien été effectuée !\n
    Détail de la commande :\n
    <%= order.first_name %> <%= order.last_name %>\n
    Numéro de la commande : <%= order.id %>\n
    Box : «<%= order.box.title %>»\n
    Mode de livraison : <%= order.delivery_name %>\n
    Adresse de livraison :\n
    <%= order.name %>\n
    <%= order.address %>\n
    <%= order.address_zipcode %> <%= order.address_city %>\n
    Si jamais tu ne reçois pas ton colis, n’hésite pas à nous le signaler à cette adresse. Nous ferons de notre mieux pour trouver une solution.\n
    Pour en savoir plus, suis-nous sur Instagram.
  `,
  html: `
  <div>
    <div style="text-align:center">
        <img style="max-width:170px;margin-bottom:30px" src="https://ci6.googleusercontent.com/proxy/dFfS2Ew7OOsjbxqGAaIiTxi8Wwb0hX8taIA8FnA_f_2kKYkRucNl5A4VmAnlTXmeeHQbkMtniHQKCrdxbyUutNR1aXgig58SPG3gkwj3NNdYUxJLwNjeDg=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/header.jpg" class="CToWUd a6T" tabindex="0">
        <div class="a6S" dir="ltr" style="opacity: 0.01; left: 374px; top: 281px;">
          <div id=":275" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Télécharger la pièce jointe " data-tooltip-class="a1V" data-tooltip="Télécharger">
              <div class="akn">
                <div class="aSK J-J5-Ji aYr"></div>
              </div>
          </div>
        </div>
    </div>
    <div style="text-align:center">
        <span>
          <div style="font-family:&quot;CarterOne-Regular&quot;;font-size:18px;display:inline-block;margin-bottom:12px">
              Confirmation de ta commande <span class="il">Tumeplay</span>
          </div>
          <div style="display:inline-block;height:3px;width:100%;background-color:rgb(253,188,17)">
          </div>
        </span>
    </div>
    <div style="padding:10px;float:left"><img style="width:30px;height:30px" src="https://ci3.googleusercontent.com/proxy/zEYVZ3ooo5ElvsR8vW1yVPEJeXZ8lI-MHdM3GkPDS_xptWiHiIR6ceE3b8a0y3v-eXtir0TKZxAsc4xwLMAYKcSTWLpjYnjdt84-VvsZixSYzpSBgYiO1FqTMl43zx0h-7nH=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/decorate-top-left.png" class="CToWUd"><img style="max-width:170px;min-width:170px" src="https://ci5.googleusercontent.com/proxy/t5ny5Cn4ZvFO1XdXmDcm0Pod-3RE7hI2uSKjCZnbhPMiAHcUUtk5VH_syGknnqZ77Hmptjs-Nd2UKCwQYc7ptXA4-KqnqGee4nFpXHRwNGgUE15sy8ps=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/box-2.png" class="CToWUd"><img style="width:30px;height:30px" src="https://ci3.googleusercontent.com/proxy/n9szBTaEr3bdhBhqI1uviLpFernVkY7RHhv7HeofEcp2fGR_yLqzt63-_k5W-a2UNDcR_Qqb7VoZji6ytvhFnzsWLh5SN95rTA-f6Aymvm_HfkYG9p4P8Ha1Ppuiae7WXJ9sBU-5bQ=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/decorate-bottom-right.png" class="CToWUd"></div>
    <div style="padding:10px;float:left">
        <div style="color:rgb(200,3,82);font-family:&quot;Abel-Regular&quot;;font-size:20px">
          <%= order.first_name %>, merci pour ta commande !
        </div>
        <br>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Ta commande a bien été prise en compte. <span class="il">Tu</span> trouveras son récapitulatif ci-dessous. Nos équipes la préparent et font le maximum pour l’expédier au plus vite. Le n° de suivi de ton
          colis te sera communiqué par e-mail.
        </div>
        <br>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Détail de ta commande :
        </div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px"><%= order.first_name %> <%= order.last_name %></div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Numéro de commande : <%= order.id %></div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Box «<%= order.box.title %>»
          </div>
          <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Mode de livraison : <%= order.delivery_name %></div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Adresse de livraison :</div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px"><%= order.name %><br>
          <%= order.address %> <br>
          <%= order.address_zipcode %> <%= order.address_city %>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="padding:10px;float:left">
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px"><span class="il">Tu</span> es (in)satisfait·e ?</div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px"><span class="il">Tu</span> peux répondre à notre questionnaire de satisfaction :
          <a href="https://forms.gle/z2zjwFLZcYtJXAkx6" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://forms.gle/z2zjwFLZcYtJXAkx6&amp;source=gmail&amp;ust=1625046955337000&amp;usg=AFQjCNFRctqCGsdesQZn1Bqa6RhpmW542Q"><span class="il">tu</span> le trouveras ici.</a>
        </div>
        <br>
        <br>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Une question sur ta commande ?</div>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Notre équipe répond à tes questions par mail à l'adresse
          <a href="mailto:contact.tumeplay@fabrique.social.gouv.fr" target="_blank">contact.<span class="il">tumeplay</span>@fabrique.<wbr>social.gouv.fr</a>
        </div>
        <br>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Si jamais <span class="il">tu</span> ne reçois pas ton colis, n’hésite pas à nous le signaler à cette adresse. Nous ferons de notre mieux pour trouver une solution.
        </div>
        <br>
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px">Pour en savoir plus, suis-nous sur Instagram
          <img style="height:20px;width:20px;margin-left:4px;margin-right:4px;vertical-align:middle" src="https://ci3.googleusercontent.com/proxy/1vAgwdzIjfjwmMyEERnlwN-VLZfx9od_GWIwVDvWErdm4pyipBBLF6WcOxhImGPngYBp8shQZPLOBEf_Brime-ocyvpd5L__ixc8YFUXj9K0Zkdd4cCw0-7tubZ9ChRp=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/instagram-icon.jpg" class="CToWUd"><a href="https://www.instagram.com/tumeplay/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/tumeplay/&amp;source=gmail&amp;ust=1625046955338000&amp;usg=AFQjCNGs_enM09YHAthMaTujXMat5mJ8mA">@<span class="il">tumeplay</span></a>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="padding:10px;float:left">
        <div style="text-align:center">Cet e-mail est envoyé automatiquement, merci de ne pas y répondre.</div>
        <br>
        <br>
        <br>
        <br>
    </div>
    <div style="padding:10px;float:left"><img style="max-width:100%;max-height:100px" src="https://ci3.googleusercontent.com/proxy/4QNaL6hCzC10rjxu9Vq-zg1rtagTil6e_48bqlmvm7OoskdwQxoVgupsspORTpB3VcpBakKhW2u9zB0t3cy2NDxDDuVLALrsvA8gSMur7ZePt1nTxV_2zp9hEA=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/ministere.jpg" class="CToWUd"></div>
    <div style="padding:10px;float:left">
        <img style="height:30px" src="https://ci4.googleusercontent.com/proxy/xU8GooTYn79O4gIoHizd0Rq6Fa5HATG1VdFY34NcPn3NthsN53WXEOmx3UvHRtZXdz43IWWW4j1Md8Z-0Cy-oW1TfE5L8wByI_sU0yoP36t57uRnRF1OWwahb-qC=s0-d-e1-ft#https://tumeplay-api.fabrique.social.gouv.fr/pictures/mail/logo-inline.jpg" class="CToWUd">
        <div style="font-family:&quot;Chivo-Regular&quot;;font-size:13px;line-height:22px"><span class="il">Tumeplay</span> est une initiative des Ministères des Solidarités et de la Santé.</div>
        <div class="yj6qo"></div>
        <div class="adL">
        </div>
    </div>
    <div class="adL">
    </div>
    <div style="clear:both" class="adL"></div>
    <div class="adL">
    </div>
  </div>
  `
}
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;

    // CHECK AVAILABILITY & DECREMENT STOCK
    if (ctx.request.body.content[0].__component === 'commandes.box-sur-mesure') {
      const products_box = ctx.request.body.content[0].produits 
      const available = await strapi.services['box-sur-mesure'].checkDynamicBoxAvailability(products_box)

      if (available) {
        products_box.forEach((product_wrapper) => {
          strapi.services["box-sur-mesure"].decrement(product_wrapper.produit, product_wrapper.quantity)
        })
      } else {
        return ctx.badRequest(null, 'Some products unavailable');
      }
    } else if (ctx.request.body.content[0].__component === 'commandes.box') {
      const box_id = ctx.request.body.content[0].box
      const available = await strapi.services.box.checkBoxAvailability(box_id)
      
      if (available) {
        strapi.services["box"].decrement(box_id, 1)
      } else {
        return ctx.badRequest(null, 'Box ' + box_id + ' unavailable');
      }
    }

    let tmp_order = ctx.request.body

    // FILL NAME
    if (tmp_order.poi_name) {
      tmp_order.name = tmp_order.poi_name
    } else {
      tmp_order.name = tmp_order.first_name + ' ' + tmp_order.last_name
    }

    //SAVE ORDER
    entity = await strapi.services.commande.create(tmp_order);

    // SEND CONFIRMATION EMAIL TO USER
    if (ctx.request.body.content[0].__component === 'commandes.box' && ctx.request.body.email && !ctx.request.body.no_email) {
      strapi.log.info('SENDING EMAIL TO : ', entity.email, ' - ORDER NUMBER ', entity.id)

      const box_id = ctx.request.body.content[0].box
      const box = await strapi.services.box.findOne({id: box_id})

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: entity.email
        },
        EMAIL_ORDER_CONFIRM,
        {
          order: Object.assign(
            _.pick(entity, ['name', 'first_name', 'last_name', 'id', 'address', 'address_zipcode', 'address_city']),
            {
              delivery_name: entity.delivery === 'pickup' ? 'En point relais' : 'À domicile',
              box: _.pick(box, ['title'])
            }
          )
        }
      )
    }    

    return entity;
  }
};
