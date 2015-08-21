export function hasPermission(user, group) {
    if (!user.token) {
      return false;
    }
    if (!group) {
      // If no group is specified, then simply return true.
      return true;
    }
    if (group.constructor === String && user.permissions[group]) {
      // Check if the user has the group permission.
      return true;
    } else if (group.constructor === Array) {
      // Check if the user has ANY of the group permissions.
      for (let i = 0; i < group.length; i++) {
        if (user.permissions[group[i]]) {
          return true;
        }
      }
    }
  }
}
