import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FixtureService } from '../fixture/fixture.service';

@Injectable()
export class PredictionGuard implements CanActivate {
  constructor(private fixtureService: FixtureService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { fixture } = context.switchToHttp().getRequest().body;
    const fixtureDocument = await this.fixtureService.GetById(fixture);

    // Check if prediction is made 1 hour before the fixture
    const now = new Date();
    const fixtureDate = new Date(fixtureDocument.kickOffDate);
    const oneHourBeforeFixture = new Date(
      fixtureDate.getTime() - 60 * 60 * 1000
    );
    return now < oneHourBeforeFixture;
  }
}
