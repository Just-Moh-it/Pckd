import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectHit } from "../../../features/dashboardSlice";
import ListItem from "../../../components/ListItem";
import { getBackendURL, getHumanDateFromEpoch } from "../../../utils";

// Icons
import { ReactComponent as SortAscending } from "../../../assets/icons/sort-ascending.svg";
import { ReactComponent as Filter } from "../../../assets/icons/filter.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { ReactComponent as Globe } from "../../../assets/icons/globe.svg";

const RightWrapperStyles = styled.div`
  height: 100%;
  padding: 14px 30px 0 0;

  & .flex-height {
    display: flex;
    flex-direction: column;
    height: 65vh;
  }

  & .main-btn {
    padding: 7px;
  }

  & .detail {
    overflow-y: scroll;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 18px 0 33px;
    flex: 1;
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

  & .main-btn svg {
    width: 24px;
    margin-bottom: -6px;
  }

  & .detail.location {
    /* height: 100px; */
    height: max-content;
  }

  & .detail.list {
    /* height: 100px; */
    flex: 1;
    overflow-y: scroll;
  }

  & .map {
    overflow: hidden;
    padding: -10px;
  }

  & .map iframe {
    width: 100%;
    height: 200px;
    border: none;
  }
`;

const RightWrapper = () => {
  const activePckd = useSelector((state) => state?.dashboard?.activePckd);
  const dispatch = useDispatch();

  const hits = activePckd?.hits;

  useEffect(() => {
    if (hits?.length > 0) {
      dispatch(selectHit(hits[0].id));
    }
  }, [dispatch, hits]);

  return (
    <RightWrapperStyles className="title-wrapper">
      {/* Title */}
      <div className="title">
        <h3 className="sub-heading">View info about</h3>
        <h1 className="heading">Clickers</h1>
      </div>
      {/* Header-content */}
      <div className="header-content">
        <div className="search-bar shadowed">
          <Filter />
          <input type="text" placeholder="Filter..." />
        </div>
        <div className="">
          <button className="shadowed btn main-btn">
            <SortAscending />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="details">
        <div className="flex-height">
          <div className="detail location">
            <h3 className="detail-title">Locations</h3>
            <div className="detail-content shadowed">
              <div className="detail-content-item map">
                <p className="detail-content-item-title-text"></p>
                <iframe
                  src={`https://maps.google.com/maps?q=${"dallas"}&output=embed`}
                ></iframe>
              </div>
            </div>
          </div>
          <div className="detail list">
            <h3 className="detail-title">All Clicks</h3>
            <div className="detail-content shadowed">
              <div className="detail-content-item">
                {hits?.length !== 0 &&
                  hits?.map((hit) => (
                    <ListItem
                      leftIcon={{
                        src: `${getBackendURL()}/static/flags/${hit?.location?.country?.code?.toLowerCase()}.svg`,
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
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RightWrapperStyles>
  );
};

export default RightWrapper;
