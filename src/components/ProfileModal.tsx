import React, { useState } from 'react';
import { X, User, Check, Mail, BookOpen } from 'lucide-react';
import { UserType } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: UserType;
  email: string;
  onSave: (name: string, role: UserType, email: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  name,
  role,
  email,
  onSave
}) => {
  const [userName, setUserName] = useState(name);
  const [userRole, setUserRole] = useState<UserType>(role);
  const [userEmail, setUserEmail] = useState(email);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userName, userRole, userEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">User Profile</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 font-medium text-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Primary Academic / Pro Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserType)}
              className="w-full rounded-xl border border-slate-200 p-2.5 font-semibold text-slate-800 bg-white"
            >
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
              <option value="Developer">Developer</option>
              <option value="Researcher">Researcher</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 p-2.5 font-medium text-slate-800"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2 text-blue-800">
            <BookOpen className="w-4 h-4 shrink-0 text-blue-600" />
            <span>Student tier automatically unlocks free model allowances and Copilot tips.</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
