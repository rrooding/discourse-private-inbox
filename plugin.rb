# frozen_string_literal: true

# name: discourse-private-inbox
# about: Disable admin access to user inbox
# version: 1.0
# authors: Ralph Rooding
# url: https://github.com/rrooding/discourse-private-inbox

enabled_site_setting :private_inbox_enabled

after_initialize do
  add_to_class(:guardian, :can_see_private_messages?) do |user_id|
    if SiteSetting.private_inbox_enabled
      (authenticated? && @user.id == user_id)
    else
      # Original implementation here (from lib/guardian.rb)
      is_admin? || (authenticated? && @user.id == user_id)
    end
  end
end
