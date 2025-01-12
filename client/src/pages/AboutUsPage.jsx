import React from "react";

const GrsIDTable = () => {
  const members = [
    { sID: "3740878", name: "Hur Hyeonbin" },
    { sID: "3878323", name: "Bui Hong Thanh Thien" },
    { sID: "3957386", name: "Tran Thanh Tu" },
    { sID: "3817693", name: "Vo Duc Tan" },
    { sID: "3863973", name: "Tran Vinh Trong" },
    { sID: "3914298", name: "Nguyen Huy Hoang " },
    { sID: "3911749 ", name: "Nguyen Tan Phat " },
    { sID: "3922418 ", name: "Pham Nguyen Minh Dang " },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {members.map((member) => (
        <div key={member.sID} className="border p-4 rounded shadow text-center">
          <p>
            <strong>sID:</strong> {member.sID}
          </p>
          <p>
            <strong>Name:</strong> {member.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GrsIDTable;
