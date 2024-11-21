import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {/* {(menu || FALLBACK_FOOTER_MENU).items.map((item) => { */}
      {FALLBACK_FOOTER_MENU.items.map((item) => {
        // @fix: make footer items fill wide screen
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a
            className="flex items-center gap-1"
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.80609 0.267367C7.85697 0.0660302 8.14303 0.0660302 8.1939 0.267367L9.26722 4.51494C9.29776 4.63579 9.43019 4.69956 9.54372 4.64809L13.5338 2.83893C13.7229 2.75317 13.9013 2.97682 13.7756 3.14213L11.1239 6.6296C11.0485 6.72882 11.0812 6.87213 11.1922 6.92879L15.0944 8.92037C15.2794 9.01477 15.2158 9.29366 15.0081 9.29846L10.6282 9.39969C10.5036 9.40257 10.412 9.51749 10.4369 9.63962L11.3128 13.9322C11.3543 14.1357 11.0966 14.2598 10.9634 14.1005L8.15344 10.7393C8.0735 10.6436 7.9265 10.6436 7.84656 10.7393L5.03658 14.1005C4.90339 14.2598 4.64566 14.1357 4.68718 13.9322L5.5631 9.63962C5.58802 9.51749 5.49638 9.40257 5.37176 9.39969L0.991852 9.29846C0.784242 9.29366 0.720588 9.01477 0.905556 8.92037L4.8078 6.92879C4.91882 6.87213 4.95153 6.72882 4.87609 6.6296L2.2244 3.14213C2.09871 2.97682 2.27707 2.75317 2.4662 2.83893L6.45628 4.64809C6.56981 4.69956 6.70224 4.63579 6.73278 4.51494L7.80609 0.267367Z"
                fill="white"
              />
            </svg>
            {item.title}
          </a>
        ) : (
          <NavLink
            className="flex items-center gap-1"
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.80609 0.267367C7.85697 0.0660302 8.14303 0.0660302 8.1939 0.267367L9.26722 4.51494C9.29776 4.63579 9.43019 4.69956 9.54372 4.64809L13.5338 2.83893C13.7229 2.75317 13.9013 2.97682 13.7756 3.14213L11.1239 6.6296C11.0485 6.72882 11.0812 6.87213 11.1922 6.92879L15.0944 8.92037C15.2794 9.01477 15.2158 9.29366 15.0081 9.29846L10.6282 9.39969C10.5036 9.40257 10.412 9.51749 10.4369 9.63962L11.3128 13.9322C11.3543 14.1357 11.0966 14.2598 10.9634 14.1005L8.15344 10.7393C8.0735 10.6436 7.9265 10.6436 7.84656 10.7393L5.03658 14.1005C4.90339 14.2598 4.64566 14.1357 4.68718 13.9322L5.5631 9.63962C5.58802 9.51749 5.49638 9.40257 5.37176 9.39969L0.991852 9.29846C0.784242 9.29366 0.720588 9.01477 0.905556 8.92037L4.8078 6.92879C4.91882 6.87213 4.95153 6.72882 4.87609 6.6296L2.2244 3.14213C2.09871 2.97682 2.27707 2.75317 2.4662 2.83893L6.45628 4.64809C6.56981 4.69956 6.70224 4.63579 6.73278 4.51494L7.80609 0.267367Z"
                fill="white"
              />
            </svg>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'High Quality Ingredients',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Independently Certified',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Expert Driven',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Shipped Internationally',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'High Quality Ingredients',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

// const FALLBACK_FOOTER_MENU = {
//   id: 'gid://shopify/Menu/199655620664',
//   items: [
//     {
//       id: 'gid://shopify/MenuItem/461633060920',
//       resourceId: 'gid://shopify/ShopPolicy/23358046264',
//       tags: [],
//       title: 'Privacy Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/privacy-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633093688',
//       resourceId: 'gid://shopify/ShopPolicy/23358013496',
//       tags: [],
//       title: 'Refund Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/refund-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633126456',
//       resourceId: 'gid://shopify/ShopPolicy/23358111800',
//       tags: [],
//       title: 'Shipping Policy',
//       type: 'SHOP_POLICY',
//       url: '/policies/shipping-policy',
//       items: [],
//     },
//     {
//       id: 'gid://shopify/MenuItem/461633159224',
//       resourceId: 'gid://shopify/ShopPolicy/23358079032',
//       tags: [],
//       title: 'Terms of Service',
//       type: 'SHOP_POLICY',
//       url: '/policies/terms-of-service',
//       items: [],
//     },
//   ],
// };

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
