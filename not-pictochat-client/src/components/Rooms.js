import React from "react";
import PropTypes from "prop-types";

function Rooms(props) {
  let selectedStyle = {
    outlineStyle: "solid",
    outlineWidth: "2px",
    outlineColor: "rgba(231, 90, 124, 1)"
  };
  let notSelectedStyle = {
    outlineStyle: "solid",
    outlineWidth: "2px",
    outlineColor: "#f1f1f1"
  };
  return props.rooms.map(room => (
    <div
      className="row m-1 p-3"
      key={room.id}
      onClick={props.selectRoom.bind(this, room.id)}
      style={props.selectedRoom === room.id ? selectedStyle : notSelectedStyle}
    >
      <div className="col">Name: {room.name}</div>
      <div className="col">People: {room.people}/16</div>
    </div>
  ));
}

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.id,
      name: PropTypes.string,
      people: PropTypes.number
    })
  )
};

export default Rooms;
