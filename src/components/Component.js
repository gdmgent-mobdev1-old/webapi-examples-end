/**
 * A Default Component
 */

export default class Component {
  render() {
    // create the component container
    const componentContainer = document.createElement('div');
    componentContainer.className = 'defaultComponent';

    // return the component container
    return componentContainer;
  }
}
