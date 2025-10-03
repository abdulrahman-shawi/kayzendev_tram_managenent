// components/NewProjectForm.tsx
'use client';

import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';

interface ProjectData {
  projectName: string;
  projectOwner: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectScope: string;
  projectType: string;
  features: string[];
}

const NewProjectForm = () => {
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: '',
    projectOwner: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectScope: '',
    projectType: '',
    features: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setProjectData(prev => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter(feature => feature !== value),
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("customer", JSON.stringify(projectData));

      files.forEach(file => formData.append("files", file));

      const response = await fetch(`${DOMAIN}/api/apps/dashboards`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "An unknown error occurred" }));
        throw new Error(errorData.message);
      }

      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unexpected error", error);
  }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Project</h2>
      <form onSubmit={formSubmitHandler} className="max-w-4xl mx-auto space-y-6 bg-gray-100 p-8 rounded-lg">

        {/* Project Information */}
        <div className="border-b border-gray-700 pb-4">
          <h3 className="text-xl font-semibold mb-4">Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "projectName", placeholder: "Business/Project Name", type: "text", required: true },
              { name: "projectOwner", placeholder: "Project Owner (Team Member)", type: "text", required: true },
              { name: "clientName", placeholder: "Client Contact Name", type: "text", required: true },
              { name: "clientEmail", placeholder: "Client Contact Email", type: "email", required: true },
              { name: "clientPhone", placeholder: "Client Contact Phone", type: "tel", required: false },
            ].map(field => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="border-gray-700 border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                required={field.required}
                value={projectData[field.name as keyof ProjectData] as string}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* Scope & Goals */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Scope & Goals</h3>
          <textarea
            name="projectScope"
            placeholder="Detailed description of the project's purpose and end goal..."
            rows={4}
            className="border-gray-700 border w-full p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
            value={projectData.projectScope}
            onChange={handleChange}
          />
        </div>

        {/* Project Categorization */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Project Categorization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="projectType"
              className="border-gray-700 h-[40px] border p-2 rounded-md focus:ring-2 focus:ring-gray-400 outline-none"
              required
              value={projectData.projectType}
              onChange={handleChange}
            >
              <option value="" disabled>Select Project Type</option>
              <option value="Website">Website</option>
              <option value="WebApp">Web Application</option>
              <option value="E-commerce">E-commerce Store</option>
            </select>

            <div>
              <label className="block mb-2 text-sm font-medium">Key Features:</label>
              <div className="grid grid-cols-2 gap-2">
                {["User Accounts", "Shopping Cart", "Blog", "CMS"].map(feature => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      className="bg-gray-600 rounded"
                      onChange={handleCheckboxChange}
                      checked={projectData.features.includes(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-700">Attach Files:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block p-3 w-full text-sm text-gray-900 border border-gray-700 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {files.length > 0 && (
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Create Project
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewProjectForm;
