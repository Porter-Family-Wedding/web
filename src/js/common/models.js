import { schema as normalizrSchema } from 'normalizr';

class Model {
  constructor(name, schema) {
    this.name = name;
    this.schema = new normalizrSchema.Entity(name, schema);
  }

  toString() {
    return this.name;
  }
}

export const addresses = new Model('addresses');
export const people = new Model('people');
export const invites = new Model('invites', { address: addresses.schema, people: [people.schema] });