import Constraint from './Constraint';

/**
 * Expects a GraphicalObject (probably a Node) and a Connector,
 * and calls Connector.maintain() when the Node updates.
 * This will keep the Connector positioned appropriately relative
 * to the updated Node and the other Node it is connected to.
 * @author scottdonaldson
 * @see objects.hw4a.Connector
 *
 */
class ConnectorConstraint extends Constraint {

  trigger() {
    this.b().maintain();
  }
}

export default ConnectorConstraint;
