module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("POSTGRESQL_ADDON_HOST", "127.0.0.1"),
        port: env.int("POSTGRESQL_ADDON_PORT", 5432),
        database: env("POSTGRESQL_ADDON_DB", "local"),
        username: env("POSTGRESQL_ADDON_USER", "local"),
        password: env("POSTGRESQL_ADDON_PASSWORD", "local"),
        ssl: getSslConfig(env) 
      },
      options: {},
    },
  },
});


function getSslConfig(env) {
  if (env.bool("DATABASE_SSL", false)) {
    return {rejectUnauthorized: false} // For self-signed certificates
  } 
  return false;
}
