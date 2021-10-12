import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
// import * as db from './database.json';

let database = [
    {
        id: 1,
        name: 'Joao',
        email: 'teste@teste.com',
    },
    {
        id: 2,
        name: 'Marco',
        email: 'marco@teste.com',
    },
    {
        id: 3,
        name: 'Helo',
        email: 'teste@teste.com',
    },
];

let idCount = database.length + 1;

const PROTO_PATH = path.resolve() + '/src/protos/wishlist.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const wishlistProto = grpc.loadPackageDefinition(packageDefinition);

function getUser(_, callback) {
    const user = database.find((user) => user.name === _.request.name);
    callback(null, user);
}

function createUser(call, callback) {
    const user = {
        id: idCount,
        ...call.request,
    };
    database.push(user);
    callback(null, user);
}

const server = new grpc.Server();

server.addService(wishlistProto.Wishlist.service, {
    getUser: getUser,
    createUser: createUser,
});

server.bindAsync('127.0.0.1:5000', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('Server running at http://127.0.0.1:5000');
    server.start();
});
