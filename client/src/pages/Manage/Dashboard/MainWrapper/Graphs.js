import React from "react";
import styled from "styled-components";

import Chart from "../../../../components/Chart";

const Wrapper = styled.div`
  margin-top: 15px;

  & .title {
    margin-top: 5px;
  }
`

const StyledChart = styled(Chart)`
  /* width: 100%; */
  & g {
    margin: auto;
  }
`;

const GraphsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
`;

const GraphWrapper = styled.div`
  margin-top: 20px;
  overflow: scroll;
  height: 80%;
  width: 100%;
  background-color: white;
`;

const Graphs = ({ activePckd }) => {
  if (!activePckd?.hitCount) return null;

  return (
    <>
      {/* Graphs */}
      <Wrapper>
        <hr className="sep" />
        {/* Title */}
        <div className="title">
          <h3 className="sub-heading">View Stats and</h3>
          <h1 className="heading">Insights</h1>
        </div>
        <GraphsWrapper>
          <GraphWrapper className="details">
            <StyledChart
              data={parseDataForCountryGraph(activePckd?.byCountryGraph)}
              title="Hits By Country"
            />
          </GraphWrapper>
          <div className="vl"></div>
          <GraphWrapper className="details">
            <StyledChart data={parseDataForBrowserGraph(activePckd?.hits)}
            title="Browsers Used" />
          </GraphWrapper>
        </GraphsWrapper>
      </Wrapper>
    </>
  );
};

const parseDataForCountryGraph = (data) => {
  return Object.keys(data).map((item) => ({
    name: data[item].country.name,
    y: data[item].count,
  }));
};

const parseDataForBrowserGraph = (data) => {
  let returner = {};

  data.forEach((hit) => {
    const browser = hit?.browser?.name;

    if (browser) {
      returner[browser] ? (returner[browser] += 1) : (returner[browser] = 1);
    } else {
      returner["unknown"]
        ? (returner["unknown"] += 1)
        : (returner["unknown"] = 1);
    }
  });
  // return [{ y: 1, name: "hi" }];
  // return data

  return Object.keys(returner).map((browserName) => ({
    name: browserName,
    y: returner[browserName],
  }));
};

export default Graphs;
