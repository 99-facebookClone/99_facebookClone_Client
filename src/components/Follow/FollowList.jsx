import { followList } from 'api/users';
import { useQuery } from 'react-query';
import FollowItem from './FollowItem';

const FollowList = () => {

  const { data } = useQuery("followList",followList);

  return (
    <div className='mr-3 my-3 w-70 fixed right-0 '>
      <p className='text-xl font-bold leading-6 text-gray-900 my-1 '>
        친구 목록
      </p>
      <ul>
        {data?.map((item) => (
          <FollowItem key={item.user_id} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default FollowList;
