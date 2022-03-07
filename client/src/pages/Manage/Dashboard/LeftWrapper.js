import React, { useState, useEffect } from "react";
import { ReactComponent as SortAscending } from "../../../assets/icons/sort-ascending.svg";
import { ReactComponent as Filter } from "../../../assets/icons/filter.svg";
import styled from "styled-components";
import ListItem from "../../../components/ListItem";
import {
  getCompanyLogoLinkFromURI,
  getHumanDateFromEpoch,
  flattenObject,
} from "../../../utils";

// Icons and assets
import { ReactComponent as Globe } from "../../../assets/icons/globe.svg";
import { ReactComponent as Click } from "../../../assets/icons/click.svg";
import { ReactComponent as Link } from "../../../assets/icons/link.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserPckds, selectPckd } from "../../../features/dashboardSlice";

const LeftWrapperStyles = styled.div`
  height: 100%;
  padding: 14px 30px 20px 0;
  max-width: 450px;

  & .main-btn {
    padding: 7px;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 10px;
  }

  /* Search Bar */
  & .search-bar {
    padding: 13px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .main-btn svg {
    width: 24px;
    margin-bottom: -6px;
  }

  & .search-bar input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 18px;
    color: #878787;
    outline: none;
    margin-left: 10px;
  }
  & .search-bar svg {
    height: 18px;
  }

  & {
    overflow: auto;
    padding-bottom: 100px;
  }

  & .list {
    align-items: center;
  }
`;

const LeftWrapper = () => {
  const dispatch = useDispatch();
  const { userPckds: rawUserPckds, activePckd } = useSelector(
    (state) => state.dashboard
  );
  const [userPckds, setUserPckds] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(getUserPckds({ refetch: true }));
  }, [dispatch]);

  useEffect(() => {
    if (rawUserPckds.length !== 0) {
      dispatch(selectPckd(rawUserPckds[0]?.id));
    }
  }, [dispatch, rawUserPckds]);

  useEffect(() => {
    const formatForLeftBar = (pckds) => {
      if (pckds.length === 0) {
        return;
      }

      return pckds.map((pckd) => ({
        leftIcon: {
          hover: pckd.target,
          src: getCompanyLogoLinkFromURI(pckd?.target),
        },
        rightItem: {
          subtitleItems: [
            {
              icon: { src: <Calendar />, hover: "Created on" },
              text: getHumanDateFromEpoch(pckd.createdAt),
            },
          ],
          id: pckd.id,
          title: pckd.title || "Untitled",
          target: pckd.target,
          bylineItems: [
            {
              icon: {
                src: <Globe />,
                hover: "Link",
              },
              text: pckd.target,
            },
            {
              icon: {
                src: <Link />,
                hover: "Pckd",
              },
              text: pckd.pckd,
            },
            {
              icon: {
                src: <Click />,
                hover: "Clicks",
              },
              text: pckd.hitCount,
            },
          ],
          moreButtonItems: [
            {
              text: "Edit",
              onClick: () => {
                "Edit Was Clicked";
              },
            },
          ],
        },
      }));
    };
    setUserPckds(formatForLeftBar(rawUserPckds));
  }, [dispatch, rawUserPckds]);

  const select = (id) => {
    dispatch(selectPckd(id));
  };

  return (
    <LeftWrapperStyles className="title-wrapper">
      {/* Title */}
      <div className="header-content">
        <div className="title">
          <h1 className="heading">Links</h1>
          <h3 className="sub-heading">View past links</h3>
        </div>
        <div>
          <button className="shadowed btn main-btn">
            {/* Icon */}
            <SortAscending />
          </button>
        </div>
      </div>
      {/* Header-content */}
      <div className="header-content">
        <div className="search-bar shadowed">
          <Filter />
          <input
            onChange={(e) => setFilterInput(e.target.value)}
            value={filterInput}
            type="text"
            placeholder="Filter..."
          />
        </div>
      </div>
      <div className="main-content">
        <div className="list">
          {userPckds &&
            userPckds.length > 0 &&
            userPckds
              ?.filter(
                (item) =>
                  item &&
                  Object.values(flattenObject(item))?.some((value) => {
                    return (
                      value &&
                      typeof value === "string" &&
                      value?.toLowerCase()?.includes(filterInput?.toLowerCase())
                    );
                  })
              )
              ?.map((item, index) => {
                const tick = 0.1;
                const relativeDelay = index * tick;

                const staggerVariants = {
                  hidden: { scale: 0.75, y: "100%", opacity: 0 },
                  shown: {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: { delay: relativeDelay },
                  },
                };

                return (
                  <ListItem
                    initial="hidden"
                    animate="shown"
                    variants={staggerVariants}
                    key={item?.id}
                    onClick={() => select(item.rightItem.id)}
                    leftIcon={item.leftIcon}
                    rightItem={item.rightItem}
                    isActive={activePckd?.id === item?.rightItem?.id}
                  />
                );
              })}
        </div>
      </div>
    </LeftWrapperStyles>
  );
};

export default LeftWrapper;
