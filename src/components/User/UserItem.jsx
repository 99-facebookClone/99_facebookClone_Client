import { followUser } from 'api/users';
import Loading from 'components/Loading';
import { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

const UserItem = ({ users }) => {
  const default_profile_url = '/images/default-profile-url.png';
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('followList');
    },
    onError: (error) => {
      setLoading(true);
      alert(error.message);
    },
  });

  const handleAddClick = async (follow_id) => {
    setLoading(true);
    try {
      await mutation.mutateAsync(follow_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const isValidUrl = (url) => {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    return pattern.test(url);
  };

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {users.map((user) => {
              return (
                <li
                  className='flex justify-between gap-x-6 py-2 '
                  key={user.user_id}
                >
                  <div className='flex gap-x-4 items-center'>
                    <img
                      className='h-7 w-7 flex-none rounded-full bg-gray-50'
                      src={
                        isValidUrl(user.profile_url)
                          ? user.profile_url
                          : default_profile_url
                      }
                      alt=''
                    />
                    <div className='flex justify-between w-[230px]'>
                      <p className='text-sm font-semibold leading-6 text-gray-900'>
                        {user.name}
                      </p>
                      <FiUserPlus
                        className='cursor-pointer self-center'
                        onClick={() => handleAddClick(user.user_id)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default UserItem;
