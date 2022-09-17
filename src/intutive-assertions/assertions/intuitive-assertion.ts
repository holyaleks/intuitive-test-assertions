import { Execute } from '../executor/execute';
import { Continuance } from '../continuance/continuance';

export default abstract class IntuitiveAssertions<TObject> {
  constructor(protected readonly object: TObject, protected readonly opposite = false) { }

  /**
   * Check if the expected object totally equals to expected value
   * @param expected expected value
   */
  public be(expected: TObject): Continuance<this> {
    Execute.stuff
      .checkCondition(
          !this.opposite 
            ? Object(this.object).valueOf() === Object(expected).valueOf()
            : Object(this.object).valueOf() !== Object(expected).valueOf()
      )
      .throwWithMessage(
          !this.opposite
            ? `Expected value to be '${JSON.stringify(expected)}', but found '${JSON.stringify(this.object)}'`
            : `Expected value to not be '${JSON.stringify(expected)}', but found '${JSON.stringify(this.object)}'`
          );

    return new Continuance(this);
  }
}
