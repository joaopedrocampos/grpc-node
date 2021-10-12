import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = path.resolve() + '/src/protos/wishlist.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const WishlistService = grpc.loadPackageDefinition(packageDefinition).Wishlist;

const client = new WishlistService('localhost:5000', grpc.credentials.createInsecure());

client.getUser(
    {
        name: 'Joao',
    },
    (error, res) => {
        if (error) throw error;
        console.log(res);
    }
);

client.createUser(
    {
        name: 'Joao Pedro',
        email: 'uhul@teste.com',
    },
    (error, res) => {
        if (error) throw error;
        console.log(res);
    }
);
