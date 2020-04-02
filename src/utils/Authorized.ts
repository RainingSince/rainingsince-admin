import RenderAuthorize from '@/components/Authorized';
import { getPermissions } from './authority';

// eslint-disable-next-line import/no-mutable-exports
let Authorized = RenderAuthorize(getPermissions());

const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getPermissions());
};
window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;
