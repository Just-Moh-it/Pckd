import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getCompanyLogoLinkFromURI } from "../utils";

const ListItemStyles = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 12px;
  margin: 15px 0;
  transition: all 0.2s ease-in-out;
  border: 3px solid transparent;

  &:hover {
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.1);
  }

  p {
    margin: 0;
  }

  &.active {
    border: 3px solid #7f5ee4 !important;
  }
`;

const LeftItem = styled.div`
  margin-right: 5px !important;
  margin: auto;
  display: grid;
  place-content: center;

  & img {
    width: 45px;
  }

  & .rounded {
    border-radius: 50%;
    height: 45px;
    width: 45px;
    /* cover the image */
    object-fit: cover;
    
}
`;

const RightItem = styled.div`
  flex: 1;

  .item svg {
    width: 15px;
    height: 15px;
    margin-bottom: -3px;
    display: inline-block;
  }

  .title,
  .subtitle,
  .byline {
    display: block;
  }

  .subtitle p {
    font-weight: 500;
    font-size: 12px;
    line-height: 9px;
    color: #7f5ee4;
  }

  .item,
  .item * {
    display: inline-block;
    margin-right: 3px;
  }

  .item p {
    font-size: 12px;
  }

  .title p {
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
    /* margin: -5px 0 -7px; */
    /* identical to box height */

    color: #000000;
  }
`;

// Structure
// const data = {
//   leftIcon: {
//     src,
//     hover,
//   },
//   rightItem: {
//     subtitleItems: [
//       {
//         icon: {
//           src,
//           hover,
//         },
//         text / link
//       }
//     ],
//     id,
//     title,
//     onClick,
//     bylineItems: [
//       {
//         icon: {
//           src,
//           hover
//         },
//         text / link
//       }
//     ],
//     moreButtonItems: [
//       {
//         text,
//         onClick
//       }
//     ]
//   },
// };

const ListItem = ({
  leftItem,
  leftIcon,
  rightElement,
  rightItem,
  onClick,
  isActive,
}) => {
  return (
    <ListItemStyles
      onClick={onClick}
      className={`shadowed ${isActive && " active"}`}
    >
      <LeftItem>
        {/* Icons */}
        {leftIcon ? (
          <>
            <img
              src={leftIcon?.src}
              alt={leftIcon?.hover}
              className={`${leftIcon?.rounded && "rounded"}`}
            />
          </>
        ) : (
          leftItem
        )}
      </LeftItem>
      {/* Right Items */}
      {rightElement ? (
        rightElement
      ) : (
        <RightItem>
          {/* Subtitle */}
          <div className="subtitle">
            {rightItem.subtitleItems.map((subtitle) => (
              <div className="item" title={subtitle.icon.hover}>
                {subtitle.icon.src}
                {subtitle.link ? (
                  <Link to={subtitle.link}></Link>
                ) : (
                  <p>{subtitle.text}</p>
                )}
              </div>
            ))}
          </div>
          {/* Title */}
          <div className="title">
            <p>{rightItem.title}</p>
          </div>
          {/* Byline */}
          <div className="byline">
            {rightItem.bylineItems.map((byline) => (
              <div className="item" title={byline.icon.hover}>
                {byline.icon.src}
                {byline.link ? (
                  <Link to={byline.link}></Link>
                ) : (
                  <p>{byline.text}</p>
                )}
              </div>
            ))}
          </div>
        </RightItem>
      )}
      {/* More Button */}
      {rightItem.moreButton && (
        <div className="moreButton">
          <svg
            width="2"
            height="10"
            viewBox="0 0 2 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="1" r="1" fill="#C4C4C4" />
            <circle cx="1" cy="5" r="1" fill="#C4C4C4" />
            <circle cx="1" cy="9" r="1" fill="#C4C4C4" />
          </svg>
        </div>
      )}
    </ListItemStyles>
  );
};

export default ListItem;
