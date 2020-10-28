/* eslint-disable no-nested-ternary */

import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'

const Logo = () => (
  <div className="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 120 50">
      <g fill="none" fillRule="evenodd" transform="translate(6 3)">
        <circle cx="25.4" cy="20.4" r="1.4" fill="currentColor" />
        <circle cx="66.4" cy="21.4" r="1.4" fill="currentColor" />
        <path
          fill="currentColor"
          d="M26.8011428 26.4583139C26.802679 26.4557938 26.8042164 26.4532563 26.8057591 26.4506978 26.8051796 26.4516588 26.8043845 26.4530311 26.8033774 26.4548096L26.8011428 26.4583139zM24.371048 30.5159863C22.2599969 33.3764821 19.8406058 35.1229298 17.0043457 35.096227 14.9477514 35.0768646 13.6287068 33.8923798 13.0467623 31.9222477 12.6760139 30.6671049 12.6027047 29.5126153 12.5902769 26.8073101 12.5744735 23.3625091 12.3667298 22.0168766 11.7391839 21.5132655 11.3142279 21.1722345 10.7308893 21.2763345 9.64653825 22.0192659 9.17762461 22.340537 8.69896826 22.7262789 7.97110284 23.3539942 6.26703957 24.8235881 6.17815789 24.8974793 5.53708533 25.3144433 4.38557498 26.0634042 3.33597263 26.3308895 2.29619371 25.7992446.271042026 24.763773.0543172872 20.5785762 1.67918958 17.3005907 3.49834466 13.6306628 6.17368367 8.31956277 9.70585202 1.36596255 10.0560212.676602231 10.8987264.401633507 11.5880868.75180272 12.2774471 1.10197193 12.5524158 1.94467712 12.2022466 2.63403745 8.67386806 9.58017682 6.00220186 14.8839856 4.18789341 18.5441359 3.60800938 19.7139826 3.35013799 20.9899109 3.40765889 22.1007037 3.430652 22.5447263 3.50432133 22.9260409 3.60729201 23.1957763 3.71700093 23.1456384 3.85250595 23.0699649 4.01043136 22.9672476 4.49071952 22.6548605 4.59410998 22.5689074 6.14246238 21.2335995 6.94350275 20.5427777 7.48763005 20.1042737 8.06396261 19.7094057 10.0485828 18.3496647 11.8664507 18.0252562 13.4916686 19.3295079 15.1153024 20.6324884 15.3695333 22.2792357 15.3901195 26.7666004 15.4100571 31.1066861 15.7579249 32.2843681 17.030706 32.2963511 18.7566883 32.3126009 20.4869676 31.0635915 22.11814 28.8533362 22.7288476 28.0258211 23.2661772 27.1478715 23.7802039 26.1923174 23.8672546 26.0304937 23.9500906 25.8731334 24.0410664 25.6976304 24.0807919 25.6209953 24.2131321 25.3640653 24.2401428 25.3120655 24.3145022 25.168912 24.3608413 25.082969 24.4078981 25.0049239 24.4745573 24.8943674 24.5310019 24.812737 24.6335623 24.7065538 24.7897158 24.5125528 24.7897158 24.5125528 25.6157217 24.2732365 26.2989663 24.3756869 26.2989663 24.3756869 26.755625 24.8113741 26.983787 25.1937735 26.983787 25.1937735 27.0307996 25.4198951 27.8127411 29.5726503 29.005248 31.0251563 30.3625291 30.4388912 31.4824611 29.9551468 32.5162407 29.4210915 33.5419516 28.810946 34.6554831 28.1485603 37.9683311 25.8681938 38.6291721 25.4722627 40.5956581 24.2940778 42.3505018 23.7289063 44.472846 23.729667 47.3483344 23.634838 49.1400426 25.1997039 49.4863729 27.6764844 49.7417235 29.5026237 49.1580169 31.7152747 48.1312949 33.1975599L48.0139504 33.3447462C46.3288642 35.1889602 41.8295363 35.8951057 37.2733977 35.0740981L37.0877849 35.0273556C36.9869355 34.9944815 36.8661942 35.0126481 36.6389861 35.1449429 36.2681386 35.3608736 35.8157038 35.8021912 35.3118942 36.4747367 34.1860761 37.9776135 32.9181918 40.4738492 31.5378343 43.9385672 31.2516641 44.6568587 30.4373869 45.0071623 29.7190954 44.720992 29.0008039 44.4348218 28.6505003 43.6205447 28.9366706 42.9022531 32.0505945 35.0862577 34.762371 31.425686 37.8515272 32.3329846 41.4524114 32.9646876 44.9204458 32.4397371 45.888106 31.516001 46.4929796 30.5871791 46.8629556 29.1341306 46.7133517 28.0642383 46.5622768 26.9838263 45.986858 26.4812594 44.5189907 26.5289062 42.9030305 26.5289062 41.6283779 26.9394256 40.0682272 27.874162 39.5097169 28.2087835 36.1920097 30.4924947 34.9734192 31.217375 33.8477402 31.8869866 32.707495 32.4760425 31.4728156 33.009351 28.6210805 34.2411319 26.5025751 32.71075 25.1989424 29.3102892 24.9365318 29.7206272 24.6621271 30.1215712 24.371048 30.5159863zM53.3163818 34.7016531C51.1362011 33.6695633 51.1362011 31.3434888 52.6322919 28.3940837L60.0319501 11.4399821C60.3412395 10.7313382 61.1664374 10.4075973 61.8750814 10.7168866 62.5837253 11.026176 62.9074662 11.851374 62.5981768 12.5600179L55.164399 29.5865686C54.644523 30.613218 54.4 31.3954211 54.4 31.8823853 54.4 32.1047462 54.4097943 32.1213719 54.5144287 32.1709055 55.4086064 32.5942061 61.4544153 28.9898606 63.1615636 26.696706 63.7905207 25.8518493 64.9072248 25.8508733 65.578196 26.5685506 65.8105551 26.8170841 65.9626383 27.0958011 66.1475649 27.5211487 66.1993973 27.6403679 66.773172 29.0931022 66.9795277 29.5439336 67.6273985 30.9593564 68.1745434 31.4918369 68.6582666 31.3895597 68.9511802 31.3276269 69.2955403 31.1729594 69.682947 30.9209094 70.656869 30.2872676 71.7433571 29.1649365 73.0923478 27.4774534 73.5503812 26.904489 74.9777814 25.0429472 75.1190947 24.8630206 75.903265 23.8645793 76.414351 23.2939187 76.9161072 22.9304391 76.9573835 22.9006103 76.9573835 22.9006103 77.043148 22.846873 77.1061996 22.8099197 77.1061996 22.8099197 77.2463572 22.7476142 77.4520407 22.6357792 77.4520407 22.6357792 78.3484415 22.7789546 78.6485569 22.9977949 78.8030143 23.1104232 78.9033554 23.2406935 79.3854033 23.1603357 79.8640248 23.1074675 80.3053201 23.0904472 82.4925938 23.0060865 84.1747533 23.7848982 83.6382533 25.8962936 83.5683216 26.1715097 83.48091 26.4745896 83.3551703 26.886301 83.3132095 27.0236939 83.0890722 27.7470116 83.0251811 27.9570558 82.8836447 28.4223615 82.7751202 28.7998701 82.6820855 29.1579897 82.2913766 30.6619506 82.2712936 31.6109039 82.4591503 31.8175535 82.9774016 32.3876499 84.7518868 31.7751338 89.0758416 28.7450856 90.4137184 27.8075571 93.652001 25.1222457 93.9712215 24.8873916 96.0957333 23.3243644 98.0984642 22.664209 101.272339 22.664209 105.400711 22.664209 107.851758 26.5520094 105.470089 29.4774048 104.700078 30.4232073 103.82708 30.6086112 101.134716 30.8583385 100.586915 30.9091492 100.56163 30.911523 100.356545 30.9320281 98.0621638 31.1614286 97.2712158 31.4950882 97.2712158 31.9179688 97.2712158 32.1960198 97.4432358 32.3730813 98.1842444 32.5724578 99.2804953 32.8674161 101.073354 32.8954661 103.513798 32.6244245 104.282271 32.539076 104.974431 33.0928583 105.05978 33.861332 105.145128 34.6298056 104.591346 35.3219653 103.822872 35.4073138 97.8475961 36.0709423 94.4712158 35.1624902 94.4712158 31.9179688 94.4712158 29.3051378 96.3311118 28.5205448 100.07798 28.1459195 100.292938 28.1244272 100.318896 28.1219902 100.876115 28.070306 102.495698 27.9200833 103.259399 27.7578915 103.29871 27.7096069 104.053833 26.782091 103.22298 25.464209 101.272339 25.464209 98.6967297 25.464209 97.2751391 25.9328045 95.6305253 27.1427653 95.40896 27.3057734 92.1370364 30.0189812 90.6827033 31.0381175 85.1425035 34.9204598 82.3668224 35.8785683 80.3872853 33.7010012 79.3107773 32.5168009 79.3457394 30.8647906 79.9720418 28.4539566 80.0761933 28.0530448 80.194598 27.6411673 80.3463687 27.1422162 80.4129506 26.9233258 80.6377132 26.1979901 80.677275 26.0684525 80.6968073 26.0044976 80.7152477 25.9436816 80.7326821 25.8856843 80.6359077 25.8833146 80.5288425 25.883908 80.4132328 25.8883669 79.4379781 25.9259814 78.1264952 26.2205262 77.3662162 26.5498915 77.196608 26.7510301 75.7590424 28.6258292 75.2794099 29.2258124 73.7561938 31.1312381 72.5008177 32.4280286 71.209918 33.2678988 70.5525447 33.6955914 69.8990054 33.989125 69.2374854 34.128995 67.0115268 34.5996456 65.5738404 33.2004916 64.4335575 30.7092814 64.3428745 30.5111635 64.2050811 30.1820947 64.066459 29.8438425 60.9873402 32.7524515 55.4558298 35.7144602 53.3163818 34.7016531zM78.5587463 25.1979789C78.5574665 25.198906 78.5561799 25.1998436 78.5548866 25.2007919 78.5559385 25.2000396 78.5572924 25.1990459 78.5587463 25.1979789zM76.6482718 23.1932112C76.6490741 23.1924071 76.6498128 23.1916664 76.650489 23.190988 76.6496409 23.1918387 76.6489584 23.192523 76.6482718 23.1932112zM76.277527 23.9701315C76.2693757 23.9736242 76.2612561 23.9771224 76.2531685 23.9806261 76.2660982 23.9750248 76.2795381 23.96954 76.2937939 23.9642085L76.277527 23.9701315z"
        />
      </g>
    </svg>
  </div>
)

/**
 * NavItem
 */

const NavItem = ({ label, className, to, isExternal, onClick }) => (
  <h4 className={className}>
    {isExternal ? (
      <a href={to} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {label}
      </a>
    ) : (
      <NavLink exact href={to} to={to} onClick={onClick} activeClassName="navlink--active">
        {label}
      </NavLink>
    )}
  </h4>
)

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isExternal: PropTypes.bool,
}

NavItem.defaultProps = {
  onClick: () => {},
  isExternal: false,
}

/**
 * Navigation
 */

const sortBySortNumber = (a, b) => {
  if (a.sort < b.sort) return -1
  if (a.sort > b.sort) return 1
  return 0
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    const { pages } = props

    const { mainPages, submenuPages } = pages.reduce(
      (acc, page) => {
        if (page.nav_settings && page.nav_settings === 'primary') {
          return {
            mainPages: [page, ...acc.mainPages],
            submenuPages: acc.submenuPages,
          }
        } else if (page.nav_settings === 'footer') {
          return acc
        }
        return {
          mainPages: acc.mainPages,
          submenuPages: [page, ...acc.submenuPages].sort(sortBySortNumber),
        }
      },
      { mainPages: [], submenuPages: [] },
    )

    this.mainPages = mainPages.sort(sortBySortNumber)
    this.submenuPages = submenuPages.sort(sortBySortNumber)
  }

  openMenu = () => {
    this.setState({
      open: true,
    })
  }

  closeMenu = () => {
    this.setState({
      open: false,
    })
    document.body.scrollTop = 0
  }

  toggleMenu = () => {
    this.setState((state) => ({
      open: !state.open,
    }))
  }

  render() {
    const classNames = this.state.open ? 'nav__wrapper nav--open' : 'nav__wrapper'

    return (
      <div className={classNames}>
        <nav>
          <div className="nav__item nav__item--logo">
            <NavLink to="/" onClick={this.closeMenu}>
              <Logo />
            </NavLink>
          </div>
          <div className="nav__mobile">
            <h4 className="nav__item nav__cta">
              <a
                className=""
                target="_blank"
                rel="noopener noreferrer"
                href="http://clients.mindbodyonline.com/ws.asp?studioid=4561&stype=-7"
              >
                Sign Up
              </a>
            </h4>
            <button className="nav__item burger" onClick={this.toggleMenu} />
          </div>

          <div className="nav__items">
            {this.mainPages &&
              this.mainPages.map((page) => (
                <NavItem
                  className="nav__item nav__item--primary"
                  key={page.slug}
                  to={
                    page.outboundlink && page.outboundlink.length > 0
                      ? page.outboundlink
                      : page.slug === 'choreographers'
                      ? '/'
                      : `/${page.slug}`
                  }
                  label={page.title}
                  onClick={this.closeMenu}
                  isExternal={Boolean(page.outboundlink && page.outboundlink.length > 0)}
                />
              ))}
            <NavItem
              className="nav__item nav__item--primary"
              onClick={this.closeMenu}
              isExternal
              label="Schedule"
              to="https://clients.mindbodyonline.com/classic/mainclass?studioid=4561"
            />
            {this.submenuPages.length && (
              <div className="nav__item nav__item--primary nav__submenu">
                <h4 className="nav__submenu--title">
                  About <span className="icon--down" />
                </h4>
                <div className="nav__submenu--list">
                  {this.submenuPages.map((page) => (
                    <NavItem
                      className="nav__submenu--item"
                      key={page.slug}
                      onClick={this.closeMenu}
                      to={
                        page.outboundlink && page.outboundlink.length > 0
                          ? page.outboundlink
                          : page.slug === 'choreographers'
                          ? '/'
                          : `/${page.slug}`
                      }
                      label={page.title}
                      isExternal={Boolean(page.outboundlink && page.outboundlink.length > 0)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navigation)
