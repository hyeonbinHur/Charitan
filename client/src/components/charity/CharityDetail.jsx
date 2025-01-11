import "./CharityDetail.css";

const CharityDetail = ({ charity }) => {
  return (
    <div className="charity-detail-container">
      <p className="breadcrumb">{charity.category} using bread crumb</p>
      <div className="avatar-container">Avatar</div>
      <h1 className="charity-name">{charity.organization_name}</h1>
      <div className="charity-meta">
        <span>ID: {charity.charity_id}</span>
        <span>Created: {new Date(charity.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(charity.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="charity-description">
        <p>{charity.description}</p>
      </div>
      <div className="charity-contact">
        <a href={`mailto:${charity.email}`}>{charity.email}</a>
      </div>
      <button className="create-button">Create Charity</button>
    </div>
  );
};

export default CharityDetail;
