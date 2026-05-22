"use client";

import { JobSeekerUserMenu } from "../jobseeker-user-menu";

type UserDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function UserDropdown({ isOpen, onToggle }: UserDropdownProps) {
  return <JobSeekerUserMenu isOpen={isOpen} onToggle={onToggle} />;
}
