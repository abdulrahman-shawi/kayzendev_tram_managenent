"use client";
import { CustomerDto } from "@/utils/dio";
import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify"; // Removed to resolve dependency
// import { useRouter } from "next/navigation"; // Removed to resolve dependency
// import axios from "axios"; // Removed, replaced with fetch
// import { DOMAIN } from "@/utils/constants"; // Removed to resolve dependency
// import ButtonSpinner from "@/components/ButtonSpinner"; // Removed to resolve dependency
// import { CustomerDto } from "@/utils/dio"; // Removed to resolve dependency

// --- Start of Fixes ---

// 1. Define constants and components directly to remove external dependencies.
const DOMAIN = ""; // Using an empty string for relative API paths.

const ButtonSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// 2. Define the DTO interface directly.
// --- End of Fixes ---



const CustomerPage = () => {
  // const router = useRouter(); // Removed router

  const [customers, setcustomers] = useState<CustomerDto[]>([]);
  const [loadingcustomers, setLoadingcustomers] = useState(false);

  // const [dialogOpen, setDialogOpen] = useState(false);
  // 3. Added state for a simple notification system instead of react-toastify
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Website Main Pages
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);
  const [services, setServices] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);

  // ✅ Website Store Pages
  const [products, setProducts] = useState(false);
  const [cart, setCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [orders, setOrders] = useState(false);

  // ✅ Website Utility Pages (New)
  const [websiteUtilityHome, setWebsiteUtilityHome] = useState(false);
  const [websiteUtilityProfile, setWebsiteUtilityProfile] = useState(false);
  const [websiteUtilitySettings, setWebsiteUtilitySettings] = useState(false);
  const [websiteUtilitySearch, setWebsiteUtilitySearch] = useState(false);
  const [websiteUtilityLogin, setWebsiteUtilityLogin] = useState(false);

  // ✅ Website Frontend Options (New)
  const [websiteFrontendUIUX, setWebsiteFrontendUIUX] = useState(false);
  const [websiteFrontendResponsive, setWebsiteFrontendResponsive] =
    useState(false);
  const [websiteFrontendAccessibility, setWebsiteFrontendAccessibility] =
    useState(false);

  // ✅ Website backend
  const [websiteBackendAPIs, setWebsiteBackendAPIs] = useState(false);
  const [websiteBackendDB, setWebsiteBackendDB] = useState(false);
  const [websiteBackendAuth, setWebsiteBackendAuth] = useState(false);

  // ✅ App options
  const [iosApp, setIosApp] = useState(false);
  const [androidApp, setAndroidApp] = useState(false);
  const [webApp, setWebApp] = useState(false);
  const [desktopApp, setDesktopApp] = useState(false);

  // ✅ App Utility Pages
  const [appPageHome, setAppPageHome] = useState(false);
  const [appPageProfile, setAppPageProfile] = useState(false);
  const [appPageSettings, setAppPageSettings] = useState(false);
  const [appPageSearch, setAppPageSearch] = useState(false);
  const [appPageLogin, setAppPageLogin] = useState(false);

  // ✅ App Main Pages
  const [appPageAbout, setAppPageAbout] = useState(false);
  const [appPageContact, setAppPageContact] = useState(false);
  const [appPageServices, setAppPageServices] = useState(false);
  const [appPagePrivacy, setAppPagePrivacy] = useState(false);
  const [appPageTerms, setAppPageTerms] = useState(false);

  // ✅ App Store Pages
  const [appStoreProducts, setAppStoreProducts] = useState(false);
  const [appStoreCart, setAppStoreCart] = useState(false);
  const [appStoreCheckout, setAppStoreCheckout] = useState(false);
  const [appStoreFavorites, setAppStoreFavorites] = useState(false);
  const [appStoreOrders, setAppStoreOrders] = useState(false);

  // ✅ App Frontend options
  const [appFrontendUIUX, setAppFrontendUIUX] = useState(false);
  const [appFrontendResponsive, setAppFrontendResponsive] = useState(false);
  const [appFrontendAccessibility, setAppFrontendAccessibility] =
    useState(false);

  // ✅ App Backend options
  const [appBackendAPIs, setAppBackendAPIs] = useState(false);
  const [appBackendDB, setAppBackendDB] = useState(false);
  const [appBackendAuth, setAppBackendAuth] = useState(false);

  // ✅ Marketing Tab
  const [marketingSocialMedia, setMarketingSocialMedia] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingContent, setMarketingContent] = useState(false);
  const [marketingAds, setMarketingAds] = useState(false);

  // ✅ SEO Tab
  const [seoOnPage, setSeoOnPage] = useState(false);
  const [seoOffPage, setSeoOffPage] = useState(false);
  const [seoTechnical, setSeoTechnical] = useState(false);
  const [seoLocal, setSeoLocal] = useState(false);

  // ✅ AI Tab
  const [aiChatbot, setAiChatbot] = useState(false);
  const [aiContentGeneration, setAiContentGeneration] = useState(false);
  const [aiDataAnalysis, setAiDataAnalysis] = useState(false);
  const [aiAutomation, setAiAutomation] = useState(false);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("website");

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchcustomers = async () => {
      setLoadingcustomers(true);
      try {
        const res = await fetch(`${DOMAIN}/api/apps/dashboards`);
        const data = await res.json();
        setcustomers(data || []);
        console.log(data);
      } catch (error) {
        console.error(error);
        setNotification({
          message: "Failed to fetch customers.",
          type: "error",
        });
      } finally {
        setLoadingcustomers(false);
      }
    };
  // ✅ Fetch customers
  useEffect(() => {

    fetchcustomers();
  }, []);

  // const [process, setProcess] = useState(false);

  // تعديل formSubmitHandler لإدارة process
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null); // Clear previous notifications
    // setProcess(true); // بداية العملية
    setLoading(true);
    try {
      
      const response = await fetch(`${DOMAIN}/api/apps/dashboards`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedId,
          website: {
            main_pages: {
              about: [about, 0],
              contact: [contact, 0],
              services: [services, 0],
              privacy: [privacy, 0],
              terms: [terms, 0],
            },
            store_pages: {
              products: [products, 0],
              cart: [cart, 0],
              checkout: [checkout, 0],
              favorites: [checkout, 0],
              orders: [orders, 0],
            },
            utility_pages: {
              home: [websiteUtilityHome, 0],
              profile: [websiteUtilityProfile, 0],
              settings: [websiteUtilitySettings, 0],
              search: [websiteUtilitySearch, 0],
              login: [websiteUtilityLogin, 0],
            },
            frontend: {
              ui_ux_design: [websiteFrontendUIUX, 0],
              responsive_design: [websiteFrontendResponsive, 0],
              accessibility: [websiteFrontendAccessibility, 0],
            },
            backend: {
              apis: [websiteBackendAPIs, 0],
              database: [websiteBackendDB, 0],
              authentication: [websiteBackendAuth, 0],
            },
          },
          apps: {
            platforms: {
              ios: [iosApp, 0],
              android: [androidApp, 0],
              web: [webApp, 0],
              desktop: [desktopApp, 0],
            },
            main_pages: {
              about: [appPageAbout, 0],
              contact: [appPageContact, 0],
              services: [appPageServices, 0],
              privacy: [appPagePrivacy, 0],
              terms: [appPageTerms, 0],
            },
            store_pages: {
              products: [appStoreProducts, 0],
              cart: [appStoreCart, 0],
              checkout: [appStoreCheckout, 0],
              favorites: [appStoreFavorites, 0],
              orders: [appStoreOrders, 0],
            },
            utility_pages: {
              home: [appPageHome, 0],
              profile: [appPageProfile, 0],
              settings: [appPageSettings, 0],
              search: [appPageSearch, 0],
              login: [appPageLogin, 0],
            },
            frontend: {
              ui_ux_design: [appFrontendUIUX, 0],
              responsive_design: [appFrontendResponsive, 0],
              accessibility: [appFrontendAccessibility, 0],
            },
            backend: {
              apis: [appBackendAPIs, 0],
              database: [appBackendDB, 0],
              authentication: [appBackendAuth, 0],
            },
          },
          marketing: {
            social_media: [marketingSocialMedia, 0],
            email: [marketingEmail, 0],
            content: [marketingContent, 0],
            paid_ads: [marketingAds, 0],
          },
          seo: {
            on_page: [seoOnPage, 0],
            off_page: [seoOffPage, 0],
            technical: [seoTechnical, 0],
            local: [seoLocal, 0],
          },
          ai: {
            chatbot: [aiChatbot, 0],
            content_generation: [aiContentGeneration, 0],
            data_analysis: [aiDataAnalysis, 0],
            automation: [aiAutomation, 0],
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "An unknown error occurred" }));
        throw new Error(errorData.message);
      }

      setNotification({
        message: "Customer created successfully ✅",
        type: "success",
      });
      setLoading(false);
      // setDialogOpen(false);
      // setProcess(false); /

      window.location.reload();
    } catch (error: unknown) {
      let message = "Error creating customer ❌";
    if (error instanceof Error) {
      message = error.message;
    }
    setNotification({
      message,
      type: "error",
    });
    console.error(error);
    setLoading(false);
    // setProcess(false); /
    }
  };

  const deleteCustomer = (id: string) => {
    try {
        fetch(`${DOMAIN}/api/apps/dashboards`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: parseInt(id) }),
      });
      fetchcustomers()
    } catch (error) {
      console.log(error)
    }
  };

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      {/* Simple Notification Display */}
      {notification && (
        <div
          className={`p-4 mb-4 rounded-lg flex justify-between items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="font-bold text-xl ml-4"
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>

      {/* customers */}
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {loadingcustomers ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No customers found
              </td>
            </tr>
          ) : (
            customers.map((customer) => {
              return (
                <tr key={customer.id} className="text-center p-3">
                  <td className="border p-2">
                    {customer.customer?.clientName || "-"}
                  </td>
                  <td className="border p-2">
                    {customer.customer?.clientEmail || "-"}
                  </td>
                  <td className="border p-2">
                    {customer.customer?.clientPhone || "-"}
                  </td>
                  <td className="border py-5 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleOpen(Number(customer.id))}
                      className="text-white bg-green-500 font-bold px-3 py-2 rounded hover:bg-green-600 cursor-pointer"
                    >
                      add Task
                    </button>
                    <a
                      href={`order/${customer.id}`}
                      className="text-white bg-blue-500 font-bold px-3 py-2 rounded hover:bg-blue-600"
                    >
                      view Task
                    </a>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="text-white bg-red-500 font-bold px-3 py-2 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[650px] h-[725px] overflow-y-scroll relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Add Task Customer
            </h2>
            <form onSubmit={formSubmitHandler} className="flex flex-col">
              {/* Tabs */}
              <div className="border-b mb-4 flex space-x-4">
                {["website", "apps", "marketing", "seo", "ai"].map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-bold ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="mb-4">
                {activeTab === "website" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                    {/* Website Main Pages */}
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        Website Main Pages
                      </h3>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={about}
                          onChange={(e) => setAbout(e.target.checked)}
                        />
                        <span>About Us</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={contact}
                          onChange={(e) => setContact(e.target.checked)}
                        />
                        <span>Contact Us</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={services}
                          onChange={(e) => setServices(e.target.checked)}
                        />
                        <span>Services</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={privacy}
                          onChange={(e) => setPrivacy(e.target.checked)}
                        />
                        <span>Privacy Policy</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={terms}
                          onChange={(e) => setTerms(e.target.checked)}
                        />
                        <span>Terms & Conditions</span>
                      </label>
                    </div>

                    {/* Website Store Pages */}
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        Store Main Pages
                      </h3>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={products}
                          onChange={(e) => setProducts(e.target.checked)}
                        />
                        <span>Products</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={cart}
                          onChange={(e) => setCart(e.target.checked)}
                        />
                        <span>Shopping Cart</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={checkout}
                          onChange={(e) => setCheckout(e.target.checked)}
                        />
                        <span>Checkout Page</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={favorites}
                          onChange={(e) => setFavorites(e.target.checked)}
                        />
                        <span>Favorites</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={orders}
                          onChange={(e) => setOrders(e.target.checked)}
                        />
                        <span>My Orders</span>
                      </label>
                    </div>

                    {/* Website Utility Pages */}
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        Website Utility Pages
                      </h3>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteUtilityHome}
                          onChange={(e) =>
                            setWebsiteUtilityHome(e.target.checked)
                          }
                        />
                        <span>Home</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteUtilityProfile}
                          onChange={(e) =>
                            setWebsiteUtilityProfile(e.target.checked)
                          }
                        />
                        <span>Profile</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteUtilitySettings}
                          onChange={(e) =>
                            setWebsiteUtilitySettings(e.target.checked)
                          }
                        />
                        <span>Settings</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteUtilitySearch}
                          onChange={(e) =>
                            setWebsiteUtilitySearch(e.target.checked)
                          }
                        />
                        <span>Search</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={websiteUtilityLogin}
                          onChange={(e) =>
                            setWebsiteUtilityLogin(e.target.checked)
                          }
                        />
                        <span>Login</span>
                      </label>
                    </div>

                    {/* Website Frontend */}
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        Front-End
                      </h3>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteFrontendUIUX}
                          onChange={(e) =>
                            setWebsiteFrontendUIUX(e.target.checked)
                          }
                        />
                        <span>UI/UX Design</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteFrontendResponsive}
                          onChange={(e) =>
                            setWebsiteFrontendResponsive(e.target.checked)
                          }
                        />
                        <span>Responsive Design</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={websiteFrontendAccessibility}
                          onChange={(e) =>
                            setWebsiteFrontendAccessibility(e.target.checked)
                          }
                        />
                        <span>Accessibility</span>
                      </label>
                    </div>

                    {/* Website Backend */}
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">Back-End</h3>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteBackendAPIs}
                          onChange={(e) =>
                            setWebsiteBackendAPIs(e.target.checked)
                          }
                        />
                        <span>APIs</span>
                      </label>
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          checked={websiteBackendDB}
                          onChange={(e) =>
                            setWebsiteBackendDB(e.target.checked)
                          }
                        />
                        <span>Database</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={websiteBackendAuth}
                          onChange={(e) =>
                            setWebsiteBackendAuth(e.target.checked)
                          }
                        />
                        <span>Authentication</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "apps" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        Application Types
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={iosApp}
                            onChange={(e) => setIosApp(e.target.checked)}
                          />
                          <span>iOS App</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={androidApp}
                            onChange={(e) => setAndroidApp(e.target.checked)}
                          />
                          <span>Android App</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={webApp}
                            onChange={(e) => setWebApp(e.target.checked)}
                          />
                          <span>Web App</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={desktopApp}
                            onChange={(e) => setDesktopApp(e.target.checked)}
                          />
                          <span>Desktop App</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                      <div>
                        <h3 className="font-bold text-blue-700 mb-2">
                          App Main Pages
                        </h3>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appPageAbout}
                            onChange={(e) => setAppPageAbout(e.target.checked)}
                          />
                          <span>About Us</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appPageContact}
                            onChange={(e) =>
                              setAppPageContact(e.target.checked)
                            }
                          />
                          <span>Contact Us</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appPageServices}
                            onChange={(e) =>
                              setAppPageServices(e.target.checked)
                            }
                          />
                          <span>Services</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appPagePrivacy}
                            onChange={(e) =>
                              setAppPagePrivacy(e.target.checked)
                            }
                          />
                          <span>Privacy Policy</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageTerms}
                            onChange={(e) => setAppPageTerms(e.target.checked)}
                          />
                          <span>Terms & Conditions</span>
                        </label>
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-700 mb-2">
                          App Store Pages
                        </h3>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appStoreProducts}
                            onChange={(e) =>
                              setAppStoreProducts(e.target.checked)
                            }
                          />
                          <span>Products</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appStoreCart}
                            onChange={(e) => setAppStoreCart(e.target.checked)}
                          />
                          <span>Shopping Cart</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appStoreCheckout}
                            onChange={(e) =>
                              setAppStoreCheckout(e.target.checked)
                            }
                          />
                          <span>Checkout Page</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appStoreFavorites}
                            onChange={(e) =>
                              setAppStoreFavorites(e.target.checked)
                            }
                          />
                          <span>Favorites</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appStoreOrders}
                            onChange={(e) =>
                              setAppStoreOrders(e.target.checked)
                            }
                          />
                          <span>My Orders</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-blue-700 mb-2">
                        App Utility Pages
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageHome}
                            onChange={(e) => setAppPageHome(e.target.checked)}
                          />
                          <span>Home</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageProfile}
                            onChange={(e) =>
                              setAppPageProfile(e.target.checked)
                            }
                          />
                          <span>Profile</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageSettings}
                            onChange={(e) =>
                              setAppPageSettings(e.target.checked)
                            }
                          />
                          <span>Settings</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageSearch}
                            onChange={(e) => setAppPageSearch(e.target.checked)}
                          />
                          <span>Search</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={appPageLogin}
                            onChange={(e) => setAppPageLogin(e.target.checked)}
                          />
                          <span>Login</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                      <div>
                        <h3 className="font-bold text-blue-700 mb-2">
                          Front-End
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appFrontendUIUX}
                              onChange={(e) =>
                                setAppFrontendUIUX(e.target.checked)
                              }
                            />
                            <span>UI/UX Design</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appFrontendResponsive}
                              onChange={(e) =>
                                setAppFrontendResponsive(e.target.checked)
                              }
                            />
                            <span>Responsive Design</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appFrontendAccessibility}
                              onChange={(e) =>
                                setAppFrontendAccessibility(e.target.checked)
                              }
                            />
                            <span>Accessibility</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-700 mb-2">
                          Back-End
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appBackendAPIs}
                              onChange={(e) =>
                                setAppBackendAPIs(e.target.checked)
                              }
                            />
                            <span>APIs</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appBackendDB}
                              onChange={(e) =>
                                setAppBackendDB(e.target.checked)
                              }
                            />
                            <span>Database</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appBackendAuth}
                              onChange={(e) =>
                                setAppBackendAuth(e.target.checked)
                              }
                            />
                            <span>Authentication</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "marketing" && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-blue-700 mb-2">
                      Digital Marketing Services
                    </h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={marketingSocialMedia}
                        onChange={(e) =>
                          setMarketingSocialMedia(e.target.checked)
                        }
                      />
                      <span>Social Media Marketing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={marketingEmail}
                        onChange={(e) => setMarketingEmail(e.target.checked)}
                      />
                      <span>Email Marketing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={marketingContent}
                        onChange={(e) => setMarketingContent(e.target.checked)}
                      />
                      <span>Content Marketing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={marketingAds}
                        onChange={(e) => setMarketingAds(e.target.checked)}
                      />
                      <span>Paid Advertising Campaigns</span>
                    </label>
                  </div>
                )}

                {activeTab === "seo" && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-blue-700 mb-2">
                      SEO Services
                    </h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={seoOnPage}
                        onChange={(e) => setSeoOnPage(e.target.checked)}
                      />
                      <span>On-Page SEO</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={seoOffPage}
                        onChange={(e) => setSeoOffPage(e.target.checked)}
                      />
                      <span>Off-Page SEO</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={seoTechnical}
                        onChange={(e) => setSeoTechnical(e.target.checked)}
                      />
                      <span>Technical SEO</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={seoLocal}
                        onChange={(e) => setSeoLocal(e.target.checked)}
                      />
                      <span>Local SEO</span>
                    </label>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-blue-700 mb-2">
                      AI Services
                    </h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiChatbot}
                        onChange={(e) => setAiChatbot(e.target.checked)}
                      />
                      <span>Chatbots</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiContentGeneration}
                        onChange={(e) =>
                          setAiContentGeneration(e.target.checked)
                        }
                      />
                      <span>Content Generation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiDataAnalysis}
                        onChange={(e) => setAiDataAnalysis(e.target.checked)}
                      />
                      <span>Data Analysis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={aiAutomation}
                        onChange={(e) => setAiAutomation(e.target.checked)}
                      />
                      <span>Process Automation</span>
                    </label>
                  </div>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="text-lg text-white bg-blue-800 p-2 rounded-lg font-bold"
              >
                {loading ? <ButtonSpinner /> : "Add Customer"}
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CustomerPage;
