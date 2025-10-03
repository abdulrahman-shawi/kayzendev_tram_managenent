"use client";
import React, { useEffect, useState } from "react";
import { DOMAIN } from "@/utils/constants";
import { CustomerDto } from "@/utils/dio";
import { useParams } from "next/navigation";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
interface Customer {
  projectName?: string;
  projectOwner?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone: string; // إذا تريدها إلزامية
  projectScope?: string;
  projectType?: string;
  features?: string[];
  notes?: string;
}

export interface Column {
  id: keyof CustomerDto; // 👈 بدل string
  title: string;
}

interface ValueObject {
  [key: string]: ValueType;
}

type ValueType =
  | boolean
  | number
  | null
  | string
  | undefined
  | ValueObject
  | ValueType[];

export default function HomePage() {
  const param = useParams();
  const ids = param.id;

  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showColumnPhotos, setShowColumnPhotos] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  // حالة فتح/غلق كل section
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const columns: Column[] = [
    { id: "website", title: "Website" },
    { id: "apps", title: "Apps" },
    { id: "marketing", title: "Marketing" },
    { id: "seo", title: "SEO" },
    { id: "ai", title: "Ai" },
  ];

  const fetchCustomers = React.useCallback(async () => {
  try {
    const res = await fetch(`${DOMAIN}/api/apps/orders/${ids}`);
    const data = await res.json();
    setCustomers(data || []);
  } catch (error) {
    console.error(error);
  }
}, [ids]);


  useEffect(() => {
  fetchCustomers();
}, [fetchCustomers]); 


  useEffect(() => {
    if (customers.length > 0) {
      setEditedCustomer({ ...customers[0].customer });
    }
  }, [customers]);

  async function toggleTask(
    obj: string,
    columnId: string,
    subkey: string = "",
    checked: boolean
  ) {
    const data = { obj, columnId, subkey, value: checked };
    try {
      const res = await fetch(`${DOMAIN}/api/apps/orders/${ids}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);
      await res.json();
      fetchCustomers();
    } catch (error) {
      console.error("Toggle Task Error:", error);
    }
  }

  const addPhotos = async (columnId: string) => {
    const selectedFiles = files[columnId];
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("please upload photos first");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((f) => formData.append("files", f));
    formData.append("columnId", columnId);
    // هنا الحل
    formData.append("note", JSON.stringify(notes));

    try {
      const res = await fetch(`${DOMAIN}/api/upload2/${ids}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      alert(`Files Uploaded Successfully to ${columnId}`);
      setFiles((prev) => ({ ...prev, [columnId]: [] }));
      fetchCustomers();
    } catch (error) {
      console.error("Upload Error:", error);
      alert(`Upload Error ${error}`);
    }
  };

  const photos = customers[0]?.photo || [];



  // دالة موحدة لتحديد إذا كانت القيمة صالحة للعرض
  const shouldRender = (val: ValueType): boolean => {
    if (val === false || val === 0 || val === null || val === undefined)
      return false;
    if (Array.isArray(val)) return val.includes(true);
    if (typeof val === "object") return Object.values(val).some(shouldRender);
    return true;
  };

  const getChecked = (val: ValueType): boolean => {
    if (Array.isArray(val)) return val.some((v) => v === 1);
    if (typeof val === "object" && val !== null)
      return Object.values(val).some(getChecked);
    return val === 1;
  };



  // دالة لتغيير اسم Section بشكل جميل
  const getSectionName = (section: string) =>
    section === "store_pages"
      ? "Store Pages"
      : section === "utility_pages"
      ? "Utility Pages"
      : section === "main_pages"
      ? "Main Pages"
      : section === "frontend"
      ? "Front End"
      : section === "backend"
      ? "Back End"
      : section;

  // const isValueType = (val: unknown): val is ValueType => {
  //   return (
  //     typeof val === "boolean" ||
  //     typeof val === "number" ||
  //     val === null ||
  //     val === undefined ||
  //     Array.isArray(val) ||
  //     typeof val === "object"
  //   );
  // };

  const saveChanges = async () => {
    try {
      const formdata = {
        id: ids,
        customer: { ...editedCustomer },
      };
      const res = await fetch(`${DOMAIN}/api/apps/order2/${ids}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      if (!res.ok) throw new Error("Failed to save changes");
      await fetchCustomers();
      setIsEditing(false);
      console.log("Saved:", res.json());
    } catch (err) {
      console.error(err);
      alert("Error while saving changes");
    }
  };

  return (
    <div className="">
      {/* زر عرض الصور */}
      <button
        className="px-4 py-2 bg-gray-500 cursor-pointer text-white rounded-lg mb-4"
        onClick={() => setShowDialog(true)}
      >
        View Photos
      </button>

      {/* Dialog للصور */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
              onClick={() => setShowDialog(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Customer Photos</h2>
            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((url, index) => (
                  <Image
                    width={300}
                    height={200}
                    key={index}
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-[200px] rounded object-cover"
                  />
                ))}
              </div>
            ) : (
              <p>No photos uploaded yet.</p>
            )}
          </div>
        </div>
      )}

      {/* بيانات العميل */}
      <div className="w-full flex justify-around items-center text-gray-400 mb-4">
        <h1 className="font-bold">
          {customers.map((e) => e.customer.projectName)}
        </h1>
      </div>

      <div className="h-[80vh] flex gap-5 overflow-x-auto overflow-y-hidden">
        {/* معلومات العميل */}
        <div className="bg-gray-100 w-[350px] h-[500px] max-h-[500px] rounded-2xl flex flex-col flex-shrink-0">
          <div className="bg-gray-200 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold flex items-center justify-between">
            Informations
            {!isEditing ? (
              <button
                className="text-blue-500 text-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="text-green-500 text-sm"
                  onClick={saveChanges}
                >
                  Save
                </button>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
            {editedCustomer && (
              <div className="p-2 bg-white rounded shadow flex flex-col gap-2">
                {isEditing ? (
                  <>
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.clientName}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, clientName: e.target.value } : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.clientEmail}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, clientEmail: e.target.value } : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.clientPhone}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, clientPhone: e.target.value } : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.projectName}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, projectName: e.target.value } : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.projectOwner}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev
                            ? { ...prev, projectOwner: e.target.value }
                            : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.projectType}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, projectType: e.target.value } : prev
                        )
                      }
                    />
                    <input
                      className="border p-1 rounded"
                      value={editedCustomer.projectScope || ""}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev
                            ? { ...prev, projectScope: e.target.value }
                            : prev
                        )
                      }
                    />
                    <textarea
                      className="border p-1 rounded"
                      value={editedCustomer.notes || ""}
                      onChange={(e) =>
                        setEditedCustomer((prev) =>
                          prev ? { ...prev, notes: e.target.value } : prev
                        )
                      }
                    />
                  </>
                ) : (
                  <>
                    <div>Client Name: {editedCustomer.clientName}</div>
                    <div>Client Email: {editedCustomer.clientEmail}</div>
                    <div>Client Phone: {editedCustomer.clientPhone}</div>
                    <div>Project Name: {editedCustomer.projectName}</div>
                    <div>Owner Name: {editedCustomer.projectOwner}</div>
                    <div>Project Type: {editedCustomer.projectType}</div>
                    <div>Project Scope: {editedCustomer.projectScope}</div>
                    <div>Notes: {editedCustomer.notes}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* أعمدة المهام */}
        {columns.map((col, i) => (
          <div
            key={i}
            className="bg-gray-100 w-[350px] h-[500px] max-h-[500px] rounded-2xl flex flex-col flex-shrink-0"
          >
            <div className="bg-gray-200 text-md h-[60px] rounded-md rounded-b-none p-3 font-bold flex items-center justify-between">
              <span>{col.title}</span>
              <button
                className="px-2 py-1 bg-gray-50 text-gray-300 rounded text-sm"
                onClick={() => setShowColumnPhotos(String(col.id))}
              >
                <ImageIcon />
              </button>

              {showColumnPhotos === col.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-5 max-w-3xl w-full relative">
                    <button
                      className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                      onClick={() => setShowColumnPhotos(null)}
                    >
                      &times;
                    </button>

                    <h2 className="text-xl font-bold mb-4">
                      {col.title} Photos & Notes
                    </h2>

                    {customers[0]?.photoSection?.[col.id] ? (
                      <div className="space-y-4">
                        {/* الصور */}
                        {Array.isArray(
                          customers[0].photoSection[col.id]?.urls
                        ) &&
                        customers[0].photoSection[col.id]!.urls!.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {customers[0].photoSection[col.id]!.urls!.map(
                              (url: string, idx: number) => (
                                <Image
                                  width={300}
                                  height={200}
                                  key={idx}
                                  src={url}
                                  alt={`Photo ${idx + 1}`}
                                  className="w-full h-[200px] rounded object-cover"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <p>No photos uploaded yet.</p>
                        )}

                        {/* النوتس */}
                        {customers[0].photoSection[col.id]?.notes && (
                          <div className="p-3 bg-gray-100 rounded">
                            <h3 className="font-bold mb-1">Notes:</h3>
                            <p className="text-sm">
                              {(() => {
                                try {
                                  const notesObj = JSON.parse(
                                    customers[0].photoSection[col.id]!.notes!
                                  );
                                  return String(
                                    Object.values(notesObj)[0] || ""
                                  );
                                } catch {
                                  return "Invalid notes format";
                                }
                              })()}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p>No photos or notes for this section.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
              {customers.length > 0 &&
                Object.entries(customers[0][col.id] || {}).map(
                  ([section, value]) => {
                    const typedValue = value as ValueType; // ← هنا التحويل

                    if (!shouldRender(typedValue)) return null;
                    const open = openSections[section] || false;

                    return (
                      <div
                        key={section}
                        className="p-2 bg-white rounded shadow mb-2"
                      >
                        {/* Section Header */}
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() =>
                            setOpenSections((prev) => ({
                              ...prev,
                              [section]: !prev[section],
                            }))
                          }
                        >
                          <p className="font-bold text-md flex items-center gap-2">
                            {getSectionName(section)}
                          </p>
                          <span
                            className={`transform transition-transform ${
                              open ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            ▼
                          </span>
                        </div>

                        {/* مهام Section */}
                        {open &&
                          (typeof value !== "object" || Array.isArray(value) ? (
                            <label className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                checked={getChecked(value as ValueType)}
                                onChange={(a) =>
                                  toggleTask(
                                    col.id,
                                    section,
                                    "",
                                    a.target.checked
                                  )
                                }
                              />
                              {section}
                            </label>
                          ) : (
                            value &&
                            Object.entries(value as Record<string, ValueType>).map(([subKey, subVal]) => {
                              if (!shouldRender(subVal)) return null;
                              return (
                                <label
                                  key={subKey}
                                  className="flex items-center gap-2 mt-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={getChecked(subVal as ValueType)}
                                    onChange={(a) =>
                                      toggleTask(
                                        col.id,
                                        section,
                                        subKey,
                                        a.target.checked
                                      )
                                    }
                                  />
                                  {subKey}
                                </label>
                              );
                            })
                          ))}
                      </div>
                    );
                  }
                )}
            </div>

            {/* رفع الملفات لكل عمود */}
            {/* رفع الملفات + ملاحظات لكل عمود */}
            <div className="p-2 border-t flex flex-col gap-2">
              {/* input رفع الملفات */}
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const selectedFiles = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  setFiles((prev) => ({ ...prev, [col.id]: selectedFiles }));
                }}
              />

              {/* عرض الملفات المحددة */}
              {files[col.id]?.length > 0 && (
                <ul className="text-sm">
                  {files[col.id].map((f, idx) => (
                    <li key={idx}>{f.name}</li>
                  ))}
                </ul>
              )}

              {/* إدخال الملاحظات */}
              <input
                type="text"
                placeholder="Add notes for these files"
                value={notes[col.id] || ""}
                onChange={(e) =>
                  setNotes((prev) => ({ ...prev, [col.id]: e.target.value }))
                }
                className="border p-1 rounded"
              />

              <button
                onClick={() => addPhotos(col.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Upload
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
