import React, { useState, useEffect } from "react";
import OilTank from "../../assets/images/oil-tank_b.png";
const TopBlock = (props) => {
  const [sensorData, SetSensorData] = useState(props.sensorData);
  // console.log("data from TopBlock", sensorData);

  return (
    <>
      {sensorData.length > 0
        ? sensorData.map((item) =>
            item.name === "status" ? (
              item.last_value === true ? (
                <>
                  <div className="blocks-wrapper col-lg-3 col-md-3">
                    <div className="blocks">
                      <div className="icon-text-wrapper-large">
                        <img src={OilTank} alt="" />
                        <p>Status</p>
                      </div>
                      <p className="progress-bar-p">All tanks are working</p>
                      <div className="progress-bar">
                        <div className="progress-bar-inner green"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="blocks-wrapper col-lg-3 col-md-3">
                  <div className="blocks">
                    <div className="icon-text-wrapper-large">
                      <img src={OilTank} alt="" />
                      <p>Status</p>
                    </div>
                    <p className="progress-bar-p">There is an alarm</p>
                    <div className="progress-bar">
                      <div className="progress-bar-inner red"></div>
                    </div>
                  </div>
                </div>
              )
            ) : null
          )
        : null}
    </>
  );
};

export default TopBlock;
