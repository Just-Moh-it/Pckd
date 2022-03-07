import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectHit } from "../../../features/dashboardSlice";
import ListItem from "../../../components/ListItem";
import {
  getHumanDateFromEpoch,
  getHumanTimeFromEpoch,
  flattenObject,
} from "../../../utils";

// Icons
import { ReactComponent as SortAscending } from "../../../assets/icons/sort-ascending.svg";
import { ReactComponent as Filter } from "../../../assets/icons/filter.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { ReactComponent as Globe } from "../../../assets/icons/globe.svg";
import { ReactComponent as Pin } from "../../../assets/icons/pin.svg";
import { ReactComponent as Antenna } from "../../../assets/icons/antenna.svg";
import { ReactComponent as Server } from "../../../assets/icons/server.svg";
import { ReactComponent as Clock } from "../../../assets/icons/clock.svg";
import { ReactComponent as Browser } from "../../../assets/icons/browser.svg";
import { ReactComponent as Device } from "../../../assets/icons/device.svg";
import NoHit404Img from "../../../assets/images/404-hit.png";

const RightWrapperStyles = styled.div`
  height: 100%;
  max-height: 95vh;
  padding: 14px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 350px;

  & .flex-height {
    display: grid;
    /* Row based grid with two elements of same height */
    grid-template-rows: auto auto;
    grid-row-gap: 10px;
    max-height: 100%;
  }

  & .main-btn {
    padding: 7px;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    flex-grow: 1;
  }

  /* Search Bar */
  & .search-bar {
    padding: 13px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .search-bar input {
    /* flex-grow: 1; */
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

  & .main-btn svg {
    width: 24px;
    margin-bottom: -6px;
  }

  & .detail {
    overflow: scroll;
    max-height: 45%;
    padding-bottom: 10px;
  }

  & .detail.location {
  }

  & .detail.list {
    /* height: 100px; */
    overflow-y: scroll;
    /* padding-bottom: 200px; */
  }

  & .content.shadowed {
    overflow: hidden;
    padding: -10px -10px -10px -20px;
  }

  & .map iframe {
    width: 100%;
    height: 200px;
    border: none;
  }

  & .item .subheading {
    font-weight: 500;
    font-size: 16px;
    /* identical to box height */

    letter-spacing: 0.32em;
    text-transform: uppercase;

    color: ${(props) => props.theme.accentColor};
  }

  & .item .title {
    text-transform: unset;
  }

  & .item svg {
    width: 17px;
    height: 17px;
    margin-bottom: -3px;
    margin-right: 5px;
    color: inherit;
  }

  & .item p {
    /* margin: 0 0 5px 0; */
    font-weight: 500;
  }
`;

const Div404Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  & h3 {
    margin-top: 50px;
  }

  & img {
    max-width: 100%;
  }
`;

const RightWrapper = () => {
  const { activePckd, allPckds } = useSelector((state) => ({
    activePckd: state?.dashboard?.activePckd,
    allPckds: state?.dashboard?.userPckds,
  }));
  const activeHit = useSelector((state) => state?.dashboard?.activeHit);
  const [filterInput, setFilterInput] = useState("");
  const dispatch = useDispatch();

  const hits = activePckd?.hits;

  const handleSelectHit = useCallback(
    (id) => {
      dispatch(selectHit(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (hits && hits?.length > 0) {
      handleSelectHit(hits[0].id);
    } else {
      handleSelectHit();
    }
  }, [dispatch, hits, handleSelectHit]);

  return (
    <RightWrapperStyles className="title-wrapper">
      {/* Title */}
      <div className="top">
        <div className="title">
          <h3 className="sub-heading">View info about</h3>
          <h1 className="heading">Clickers</h1>
        </div>
        {/* Header-content */}
        <div className="header-content">
          <div className="search-bar shadowed">
            <Filter />
            <input
              type="text"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder="Filter..."
            />
          </div>
          <div className="">
            <button className="shadowed btn main-btn">
              <SortAscending />
            </button>
          </div>
        </div>
      </div>

      {allPckds?.length > 0 &&
        (activePckd?.hitCount > 0 && activePckd?.hits?.length > 0 ? (
          <>
            {activeHit && (
              <div className="detail location">
                <div className="item">
                  <Pin className="icon" />
                  <span className="subheading">Address</span>
                  <p>
                    {activeHit?.location?.city},{" "}
                    {activeHit?.location?.country?.code} -{" "}
                    {activeHit?.location?.postal}
                  </p>
                </div>
                <div className="content shadowed">
                  {activeHit?.ip && (
                    <div className="item map">
                      <span className="subheading"></span>
                      <iframe
                        title="Map"
                        src={`https://maps.google.com/maps?q=${activeHit?.location?.city}, ${activeHit?.location?.country?.name}&output=embed`}
                      />
                    </div>
                  )}
                </div>
                <div className="content">
                  {activeHit?.ip && (
                    <>
                      <div className="item">
                        <Antenna className="icon" />
                        <span className="subheading">IP</span>
                        <p>{activeHit?.ip}</p>
                      </div>
                      <div className="item">
                        <Server className="icon" />
                        <span className="subheading">{activeHit?.type}</span>
                        <p>{activeHit?.isp}</p>
                      </div>
                    </>
                  )}
                  {activeHit?.browser?.name && (
                    <div className="item">
                      <Browser className="icon" />
                      <span className="subheading">Browser</span>
                      <p>
                        {activeHit?.browser?.name +
                          (" | " + activeHit?.browser?.version || "")}
                      </p>
                    </div>
                  )}
                  {activeHit?.os.name && (
                    <div className="item">
                      <Device className="icon" />
                      <span className="subheading">Device</span>
                      <p>
                        {activeHit?.os?.name +
                          (" | " + activeHit?.os?.version || "")}
                      </p>
                    </div>
                  )}
                  <div className="item">
                    <Clock className="icon" />
                    <span className="subheading">
                      Visit Time ({activeHit?.timezone.abbreviation} |{" "}
                      {`${
                        !activeHit?.timezone.offset
                          .toString()
                          .startsWith("-") && "+"
                      } ${activeHit?.timezone.offset}`}
                    </span>
                    <p>
                      {getHumanDateFromEpoch(
                        parseInt(activeHit?.createdAt) +
                          parseInt(activeHit?.timezone?.offset)
                      )}{" "}
                      | {getHumanTimeFromEpoch(activeHit?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="detail list">
              <h3 className="detail-title">All Clicks</h3>
              <div className="content">
                <div className="item">
                  {hits?.length !== 0 &&
                    hits
                      ?.filter(
                        (item) =>
                          item &&
                          Object.values(flattenObject(item))?.some((value) => {
                            return (
                              value &&
                              typeof value === "string" &&
                              value
                                ?.toLowerCase()
                                ?.includes(filterInput?.toLowerCase())
                            );
                          })
                      )
                      ?.map((hit, index) => {
                        const tick = 0.1;
                        const relativeDelay = index < 20 ? index * tick : tick;

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
                            whileinView="shown"
                            variants={staggerVariants}
                            key={hit?.id}
                            isActive={hit?.id === activeHit?.id}
                            leftIcon={{
                              src: `/manage/flags/${hit?.location?.country?.code?.toLowerCase()}.svg`,
                              hover: hit?.location?.country?.name,
                              rounded: true,
                            }}
                            rightItem={{
                              subtitleItems: [
                                {
                                  icon: {
                                    src: <Calendar />,
                                    hover: "Date",
                                  },
                                  text: hit?.createdAt
                                    ? getHumanDateFromEpoch(hit?.createdAt)
                                    : "N/A",
                                },
                              ],
                              id: hit?.id,
                              title: `${hit?.location?.city}, ${hit?.location?.country?.code}`,
                              bylineItems: [
                                {
                                  icon: {
                                    src: <Globe />,
                                    hover: "IP Address",
                                  },
                                  text: hit?.ip,
                                },
                              ],
                            }}
                            onClick={() => handleSelectHit(hit?.id)}
                          />
                        );
                      })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Div404Wrapper>
            <img src={NoHit404Img} alt="No visitors" />
            {activePckd?.enableTracking ? (
              <>
                <h3>No Visitors Yet {":("}</h3>
                <p>
                  Select the sharable link and get more visitors. Their info
                  would be shown here!
                </p>
              </>
            ) : (
              <>
                <h3>Tracking disabled</h3>
                <p>
                  Tracking was disabled while creating this pckd, so no clicks
                  will be tracked
                </p>
              </>
            )}
          </Div404Wrapper>
        ))}
    </RightWrapperStyles>
  );
};

export default RightWrapper;
