import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../ui/button";
import { Badge } from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {
  Users,
  Search,
  Mail,
  Calendar,
  Filter,
  Info,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import axiosClient from "../../lib/axiosClient";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [cardPosition, setCardPosition] = useState('left');
  const buttonRef = useRef(null);

  // Add this function to calculate best position
const calculatePosition = (buttonElement) => {
  if (!buttonElement) return 'left';
  
  const rect = buttonElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const cardWidth = 320; // 80 * 4 (w-80 = 320px)
  
  const spaceOnRight = viewportWidth - rect.right;
  const spaceOnLeft = rect.left;
  
  // If more space on left, show on left, otherwise on right
  if (spaceOnLeft > cardWidth) {
    return 'left';
  } else if (spaceOnRight > cardWidth) {
    return 'right';
  } else {
    return 'center'; // fallback for mobile
  }
};


  useEffect(() => { fetchUsers(); }, []);
  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/dashboard/users"); 
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter by role or search
  const filterUsers = () => {
    let filtered = [...users];

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role?.toLowerCase() === roleFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  };

 useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  // Role Badge styling
  const getRoleBadge = (role) => {
    const badges = {
      admin: "bg-red-100 text-red-700 border-red-200",
      user: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return badges[role] || badges.user;
  };

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
  <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg relative z-20">
  <CardContent className="p-6">
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Role Filter */}
        <div className="w-full sm:w-64 relative z-30">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-12 w-full border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <SelectValue placeholder="Filter by role">
          {roleFilter === 'all' && 'All Roles'}
          {roleFilter === 'admin' && 'Admin'}
          {roleFilter === 'user' && 'Patient'}
        </SelectValue>
      </div>
    </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">Patient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-gray-200 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

      {/* Users Table */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-red-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" />
              Registered Users ({filteredUsers.length})
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Info</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-red-50/50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                          {user.username?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.username || 'Patient'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email || 'N/A'}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-sm border ${getRoleBadge(user.role)}`}>
                          {user.role || "N/A"}
                        </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                       {user.createdAt || user.created_date
                        ? format(new Date(user.createdAt || user.created_date), "MMM d, yyyy")
                        : "N/A"}
                      </div>
                    </td>

                    {/* Info */}
                 <td className="px-6 py-4">
                  <div className="relative inline-block">
                    <div
                      ref={buttonRef}
                      onMouseEnter={() => {
                        setHoveredUserId(user.id);
                        const position = calculatePosition(buttonRef.current);
                        setCardPosition(position);
                      }}
                    >
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Info className="w-4 h-4 text-blue-700" />
                      </Button>
                    </div>
                    
                    {hoveredUserId === user.id && (
                      <div 
                        className={`
                          z-[100] w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white p-4 shadow-2xl
                          ${cardPosition === 'left' ? 'absolute right-full mr-2 top-1/2 -translate-y-1/2' : ''}
                          ${cardPosition === 'right' ? 'absolute left-full ml-2 top-1/2 -translate-y-1/2' : ''}
                          ${cardPosition === 'center' ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                        `}
                        onMouseEnter={() => setHoveredUserId(user.id)}
                        onMouseLeave={() => setHoveredUserId(null)}
                      >
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm md:text-lg flex-shrink-0">
                                {user.username?.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{user.username}</h4>
                                <p className="text-xs md:text-sm text-gray-500 capitalize">{user.role}</p>
                              </div>
                            </div>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="flex-shrink-0 text-xs">
                              {user.role}
                            </Badge>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-200"></div>

                          {/* Details */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs md:text-sm">
                              <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600 truncate">{user.email}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs md:text-sm">
                              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600">
                                Diagnosis Date {user.diagnosis_date ? format(new Date(user.diagnosis_date), "MMM d, yyyy") : "N/A"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs md:text-sm">
                              <Shield className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600">
                                Status: <span className="text-green-600 font-medium">Active</span>
                              </span>
                            </div>
                          </div>

                          {/* Quick Stats for Patients */}
                          {user.role === 'user' && (
                            <>
                              <div className="border-t border-gray-200"></div>
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                <div className="bg-blue-50 rounded-lg p-2 text-center">
                                  <p className="text-xs text-gray-500">Appointments</p>
                                  <p className="text-base md:text-lg font-semibold text-blue-600">
                                    {user.appointmentCount || 0}
                                  </p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-2 text-center">
                                  <p className="text-xs text-gray-500">Records</p>
                                  <p className="text-base md:text-lg font-semibold text-green-600">
                                    {user.recordCount || 0}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Footer Action */}
                          <Button 
                            className="w-full mt-2 text-xs md:text-sm" 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              console.log('View full profile:', user);
                              setHoveredUserId(null);
                            }}
                          >
                            View Full Profile
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No users found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}