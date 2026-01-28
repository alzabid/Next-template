import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Gift,
  Ticket,
  CheckCircle,
} from "lucide-react";

export default function BAESAPicnicPage() {
  // Timetable data
  const schedule = [
    {
      time: "8:00 AM - 9:00 AM",
      activity: "Registration & Breakfast",
      description:
        "Check-in and enjoy a delicious breakfast with fellow members",
    },
    {
      time: "9:00 AM - 10:30 AM",
      activity: "Opening Ceremony",
      description: "Welcome address by BAESA President and opening remarks",
    },
    {
      time: "10:30 AM - 12:30 PM",
      activity: "Team Games & Sports",
      description:
        "Cricket, Football, Badminton, and other exciting team activities",
    },
    {
      time: "12:30 PM - 2:00 PM",
      activity: "Lunch Break",
      description: "Traditional Bengali lunch buffet with special delicacies",
    },
    {
      time: "2:00 PM - 3:00 PM",
      activity: "Cultural Program",
      description:
        "Music, dance performances, and entertainment by talented members",
    },
    {
      time: "3:00 PM - 4:00 PM",
      activity: "Lucky Draw & Lottery",
      description: "Exciting prizes and giveaways for all participants",
    },
    {
      time: "4:00 PM - 5:00 PM",
      activity: "Evening Snacks & Photography",
      description: "Group photos and memorable moments with colleagues",
    },
    {
      time: "5:00 PM",
      activity: "Departure",
      description: "Safe journey back home with wonderful memories",
    },
  ];

  // Event highlights
  const highlights = [
    { icon: Users, text: "200+ Expected Participants" },
    { icon: Gift, text: "Exciting Prizes & Gifts" },
    { icon: Ticket, text: "Complimentary Entry" },
    { icon: CheckCircle, text: "Family Friendly Event" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=800&fit=crop"
          alt="BAESA Picnic 2026"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              BAESA Picnic 2026
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-blue-100">
              বিএইএসএ পিকনিক ২০২৬
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-50">
              A Day of Fun, Fellowship, and Celebration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-lg">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>March 28, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>Gazipur Resort</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitation Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-2xl p-8 md:p-12 border-t-4 border-blue-600">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            You Are Cordially Invited!
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p className="text-center">Dear BAESA Members and Families,</p>
            <p>
              We are delighted to invite you to the{" "}
              <strong className="text-blue-600">
                BAESA Annual Picnic 2026
              </strong>
              , a special day designed to bring our scientific community
              together in a relaxed and joyful atmosphere. This year's picnic
              promises to be an unforgettable experience filled with exciting
              activities, delicious food, entertaining cultural programs, and
              wonderful opportunities to strengthen bonds with fellow scientists
              and their families.
            </p>
            <p>
              Join us for a day of laughter, games, and celebration as we take a
              break from our rigorous research schedules to enjoy the beauty of
              nature and companionship. Whether you're participating in sports
              competitions, enjoying traditional Bengali cuisine, or trying your
              luck in our special lottery program, there's something for
              everyone!
            </p>
            <p className="text-center font-semibold text-blue-600 text-xl">
              We look forward to seeing you and your family there!
            </p>
          </div>

          {/* Event Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timetable Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Event Schedule
            </h2>
            <p className="text-blue-100 text-lg">
              A full day of exciting activities planned for you
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border-l-4 border-blue-400"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="flex items-center gap-2 text-blue-200">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold text-white text-lg">
                        {item.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.activity}
                    </h3>
                    <p className="text-blue-100">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lottery Program Section - Image with Text */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="relative h-96 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop"
                alt="Lucky Draw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>

            {/* Right Side - Text Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                  Special Program
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Lucky Draw & Lottery
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Get ready for the most exciting part of the day! Our special
                lucky draw and lottery program offers amazing prizes for all
                participants. Every registered attendee will automatically
                receive a lottery ticket upon arrival.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Grand Prize
                    </h3>
                    <p className="text-gray-600">
                      Smart TV, Refrigerator, and other home appliances
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      2nd & 3rd Prize
                    </h3>
                    <p className="text-gray-600">
                      Smartphones, tablets, and electronic gadgets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Multiple Winners
                    </h3>
                    <p className="text-gray-600">
                      50+ consolation prizes including gift vouchers and hampers
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
                <p className="text-lg font-bold mb-2">
                  🎫 Lottery Draw Time: 3:00 PM - 4:00 PM
                </p>
                <p className="text-orange-100">
                  Don't miss this exciting opportunity! Be present during the
                  draw to claim your prize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA */}
      <div className=" py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-blue-900 text-lg mb-8">
            Register now to confirm your spot and receive your lottery ticket!
          </p>
          <button className="bg-blue-800 text-white px-8 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-900 transition-colors duration-200 shadow-lg">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
