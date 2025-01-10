const CharityDetail = ({ charity }) => {
  return (
    <div>
      <p> {charity.category} using bread crumb</p>
      <div className="border w-[45rem] h-[20rem] rounded-lg bg-stone-500">
        Avatar
      </div>
      <div> {charity.organization_name}</div>
      <div>
        {charity.charity_id}, {charity.createdAt}, {charity.updatedAt}
      </div>
      <div>
        <p>{charity.description}</p>
      </div>
      <div>
        <p>{charity.email}</p>
      </div>
      <button>create charity</button>
    </div>
  );
};

export default CharityDetail;
