import { Separator } from "../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getProjectsByCharity } from "../../utils/api/project";
import ProjectList from "../project/ProjectList";
const CharityDetail = ({ charity }) => {
  const { data: projects } = useQuery({
    queryKey: [`get-project-by-charity-${charity.charity_id}`],
    queryFn: () => getProjectsByCharity(charity.charity_id),
  });
  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-md">
        {/* Banner Section (Large Avatar / Thumbnail) */}
        <div className="relative mb-8">
          <img
            src={charity.avatar} // 큰 배너 또는 아바타 이미지 URL을 사용하세요.
            alt="Charity Banner"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
            <h1 className="text-3xl font-bold">{charity.organization_name}</h1>
          </div>
        </div>
        {/* Charity Details Section */}
        <div className="gap-8">
          <Separator className="my-5" />
          {/* Charity Information */}
          <div>
            <p className="text-lg text-gray-600 mb-4">
              Country:
              <span className="font-semibold text-gray-800">
                &nbsp;{charity.country}
              </span>
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Category:
              <span className="font-semibold text-gray-800">
                &nbsp;{charity.category}
              </span>
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Created:
              <span className="font-semibold text-gray-800">
                &nbsp;{new Date(charity.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          <Separator className="my-5" />
          {/* Description Section */}
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {charity.description}
            </p>
          </div>
        </div>
        {/* Contact Information */}
        <div className="mt-8">
          <a
            href={`mailto:${charity.email}`}
            className="text-blue-600 text-lg hover:text-blue-800"
          >
            {charity.email}
          </a>
        </div>
      </div>
      <p className="text-2xl text-gray-200">
        {charity.organization_name}&apos;s projects
      </p>
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default CharityDetail;
