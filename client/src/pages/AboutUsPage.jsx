import React from 'react';

const GrsIDTable = () => {
  const members = [
    { sID: '1', name: 'Alice' },
    { sID: '2', name: 'Bob' },
    { sID: '3', name: 'Charlie' },
    { sID: '4', name: 'Diana' },
    { sID: '3863973', name: 'Tran Vinh Trong' },
    { sID: '6', name: 'Frank' },
    { sID: '7', name: 'Grace' },
    { sID: '8', name: 'Hank' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {members.map((member) => (
        <div
          key={member.sID}
          className="border p-4 rounded shadow text-center"
        >
          <p><strong>sID:</strong> {member.sID}</p>
          <p><strong>Name:</strong> {member.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GrsIDTable;
