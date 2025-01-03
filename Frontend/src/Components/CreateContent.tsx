import { useState } from "react";

interface addcon {
  open: boolean;
  onClose: ()=>void;
}

interface Tag {
  id: number;
  name: string;
}

const linkTypes = [
  { value: "website", label: "Website" },
  { value: "document", label: "Document" },
  { value: "video", label: "Video" },
  { value: "image", label: "Image" },
  { value: "other", label: "Other" },
];

function CreateContent({ open, onClose }: addcon) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkType, setLinkType] = useState("");
  const [link, setLink] = useState("");

  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Urgent" },
  ]);
  const [selectedTag, setSelectedTag] = useState("");
  const [newTag, setNewTag] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  const handleAddNewTag = () => {
    if (newTag && !tags.some((tag) => tag.name === newTag)) {
      const newTagObject = { id: tags.length + 1, name: newTag };
      setTags([...tags, newTagObject]);
      setSelectedTag(newTag);
      setNewTag("");
      setShowNewTagInput(false);
    }
  };

  return (
    <>
      {open && (
        <div className="w-screen h-screen bg-zinc-900 fixed top-0 left-0 bg-opacity-60">
          <div className=" flex items-center justify-center w-full h-full">
            <div className="bg-white dark:bg-zinc-800 shadow-lg dark:shadow-2xl rounded-xl p-8 w-full max-w-md relative transition-colors duration-200">
              <button
                onClick={()=>onClose()}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
                Add New Item
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="linkType"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Link Type
                  </label>
                  <select
                    id="linkType"
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select link type</option>
                    {linkTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter link"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Tag
                  </label>
                  <select
                    id="tag"
                    value={selectedTag}
                    onChange={(e) => {
                      if (e.target.value === "new") {
                        setShowNewTagInput(true);
                      } else {
                        setSelectedTag(e.target.value);
                        setShowNewTagInput(false);
                      }
                    }}
                    className="w-full px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a tag</option>
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                    <option value="new">Add new tag</option>
                  </select>
                </div>
                {showNewTagInput && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-grow px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter new tag"
                    />
                    <button
                      onClick={handleAddNewTag}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                )}
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateContent;