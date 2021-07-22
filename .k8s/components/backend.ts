import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
// import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";


import { Probe } from "kubernetes-models/v1";

// const project = "fce";
const name = "tumeplay-backend";

const probe = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const createManifests = async () => {
  const manifests = await create(name, {
    env,
    config: {
      subdomain: name,
      containerPort: 1337,
      // subDomainPrefix: process.env.SOCIALGOUV_PRODUCTION ? "strapi-new-" : "strapi-",
    },
    deployment: {
      // image: getGithubRegistryImagePath(({ project, name })),
      image: `ghcr.io/socialgouv/tumeplay/backend:sha-${process.env.GITHUB_SHA}`,
      container: {
        livenessProbe: probe,
        readinessProbe: probe,
        startupProbe: probe,
        resources: {
          requests: {
            cpu: "100m",
            memory: "128Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1280Mi",
          },
        },
      },
    },
  });

  return manifests;
}

export default createManifests;
