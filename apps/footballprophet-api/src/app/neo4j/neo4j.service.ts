import { Injectable } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      `${process.env.NEO4J_SCHEME}://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
    );
  }

  async run(query: string, params?: Record<string, any>) {
    const session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records;
    } finally {
      session.close();
    }
  }
}
