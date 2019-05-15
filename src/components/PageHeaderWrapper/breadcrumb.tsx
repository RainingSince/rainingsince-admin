import React from 'react';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { urlToList } from '../_utils/pathTools';

const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  if (route.path === '/') {
    return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );
};

const renderItemLocal = item => {
  if (item.locale) {
    const name = item.name;
    return name;
  }
  return item.name;
};

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export const getBreadcrumbProps = props => {
  const { routes, params, location, breadcrumbNameMap } = props;
  return {
    routes,
    params,
    routerLocation: location,
    breadcrumbNameMap,
  };
};

const conversionFromProps = props => {
  const { breadcrumbList } = props;
  return breadcrumbList.map(item => {
    const { title, href } = item;
    return {
      path: href,
      breadcrumbName: title,
    };
  });
};

const conversionFromLocation = (routerLocation, breadcrumbNameMap, props) => {
  const { home } = props;
  const pathSnippets = urlToList(routerLocation.pathname);
  const extraBreadcrumbItems = pathSnippets
    .map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const name = renderItemLocal(currentBreadcrumb);
      const { hideInBreadcrumb } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
          path: url,
          breadcrumbName: name,
        }
        : null;
    })
    .filter(item => item !== null);
  if (home) {
    extraBreadcrumbItems.unshift({
      path: '/',
      breadcrumbName: home,
    });
  }
  return extraBreadcrumbItems;
};

export const conversionBreadcrumbList = props => {
  const { breadcrumbList } = props;
  const { routes, params, routerLocation, breadcrumbNameMap } = getBreadcrumbProps(props);
  if (breadcrumbList && breadcrumbList.length) {
    return {
      routes: conversionFromProps(props),
      params,
      itemRender,
    };
  }
  if (routes && params) {
    return {
      routes: routes.filter(route => route.breadcrumbName),
      params,
      itemRender,
    };
  }
  if (routerLocation && routerLocation.pathname) {
    return {
      routes: conversionFromLocation(routerLocation, breadcrumbNameMap, props),
      itemRender,
    };
  }
  return {};
};
