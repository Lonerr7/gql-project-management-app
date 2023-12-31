import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import Client from '../../models/Client.js';
import Project from '../../models/Project.js';
import { manipulateDocInDB } from '../../helpers/deleteDocFromDB.js';
import { operations } from '../../helpers/dictionary.js';

// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
  }),
});

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId);
        // clients.find((client) => parent.clientId === client.id);
      },
    },
  }),
});

// Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: async () => {
        return await Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, { id }) => {
        return await Client.findById(id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async () => {
        return (await Project.find()).reverse();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return await Project.findById(id);
      },
    },
  },
});

// Mutations
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { name, email, phone }) => {
        return await Client.create({ name, email, phone });
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        await Project.deleteMany({ clientId: id });

        return await manipulateDocInDB(Client, operations.DELETE, id);
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: GraphQLNonNull(GraphQLString),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { name, description, status, clientId }) => {
        const newProject = await Project.create({
          name,
          description,
          status,
          clientId,
        });

        return newProject;
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        return await manipulateDocInDB(Project, operations.DELETE, id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: GraphQLNonNull(GraphQLString),
          defaultValue: 'Not Started',
        },
      },
      resolve: async (_, { id, name, description, status }) => {
        const payload = {
          name,
          description,
          status,
        };

        return await manipulateDocInDB(Project, operations.UPDATE, id, payload);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
