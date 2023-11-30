import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()



server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Tämä JSON Server on toiminnassa --> http://localhost:${PORT}`);
});