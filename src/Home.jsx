import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import Title from './Title';
import Card from './Card';
import Skeleton from './Skeleton';

const Home = () => {
  const [members, setMembers] = useState(null);

  const { data: regularMembers } = useFetch(
    'https://api.codetabs.com/v1/proxy/?quest=https://campaign.showroom-live.com/akb48_sr/data/room_status_list.json',
  );

  useEffect(() => {
    const graduatedMembers = [];

    if (regularMembers) {
      const jkt48Members = regularMembers
        .filter(
          (item) => item.name.includes('JKT48')
            && !graduatedMembers.includes(item.url_key),
        )
        .sort((a, b) => b.follower_num - a.follower_num);

      setMembers(jkt48Members);
    }
  }, [regularMembers]);

  return (
    <>
      {members ? (
        <>
          <Title text="Regular" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {members.map((member) => (
              <Card key={member.id} data={member} to={`/room/${member.id}`} />
            ))}
          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Home;
