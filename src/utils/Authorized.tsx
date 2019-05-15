import { Authorized as RenderAuthorized } from 'ant-design-pro';
import { getPermisiions } from './authority';

let Authorized = RenderAuthorized(getPermisiions());

const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getPermisiions());
};

export { reloadAuthorized };
export default Authorized;
