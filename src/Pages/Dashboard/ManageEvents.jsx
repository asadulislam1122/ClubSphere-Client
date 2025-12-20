import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageEvents = () => {
  const { user } = useAuth(); // লগইন করা ইউজার
  const axiosSecure = useAxiosSecure();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-events", user?.email],
    queryFn: async () => {
      // ইউআরএল এ ইমেইলটি কোয়েরি হিসেবে পাঠানো হচ্ছে
      const res = await axiosSecure.get(`/manageEvents?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // ইমেইল না পাওয়া পর্যন্ত কুয়েরি চলবে না
  });

  if (isLoading)
    return <span className="loading loading-dots loading-lg"></span>;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/events/${id}`);
        if (res.data.deletedCount > 0) {
          refetch(); // ডাটা আপডেট করার জন্য
          Swal.fire("Deleted!", "Event has been removed.", "success");
        }
      }
    });
  };
  //   edit
  const handleEdit = async (event) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Event",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${event.title}">` +
        `<input id="swal-input2" type="date" class="swal2-input" value="${event.eventDate}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Location" value="${event.location}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: document.getElementById("swal-input1").value,
          eventDate: document.getElementById("swal-input2").value,
          location: document.getElementById("swal-input3").value,
        };
      },
    });

    if (formValues) {
      const res = await axiosSecure.patch(`/events/${event._id}`, formValues);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success", "Event updated!", "success");
      }
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Manage My Events ({events.length})
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center border"
          >
            <div>
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">Club: {event.clubName}</p>
              <p className="text-sm text-gray-500">Date: {event.eventDate}</p>
            </div>
            <div className="flex gap-2">
              {/* এখানে এডিট এবং ডিলিট বাটন থাকবে */}
              <button
                onClick={() => handleEdit(event)}
                className="btn btn-sm btn-info text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="btn btn-sm btn-error text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
