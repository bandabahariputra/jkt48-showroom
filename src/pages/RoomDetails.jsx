import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { getUserApi } from '../utils/api';
import parseDescription from '../utils/parseDescription';
import useFetch from '../hooks/useFetch';
import Title from '../components/Title';
import Skeleton from '../components/Skeleton';

const RoomDetails = () => {
  const { id } = useParams();

  const [description, setDescription] = useState(null);

  const { data } = useFetch(getUserApi(id));

  const toHumanDate = (timestamp) => DateTime.fromSeconds(timestamp)
    .setLocale('id')
    .toFormat('d MMMM yyyy - H:mm');

  useEffect(() => {
    if (data) {
      setDescription(parseDescription(data.description));
    }
  }, [data]);

  return (
    <>
      {!data && <Skeleton />}
      {data && (
        <div className="mb-10">
          <Title text="Biodata" />
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={data.image}
                alt={data.main_name}
                className="block md:hidden bg-white"
              />
              <img
                src={data.image_square}
                alt={data.main_name}
                className="hidden md:block bg-white"
              />
              <div className="bg-white font-medium text-sm text-neutral-900 h-full px-4 py-2">
                {data.main_name}
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              {description?.Name && (
                <div>
                  <span className="block text-neutral-300 text-xs">Nama</span>
                  <span className="font-medium">{description.Name}</span>
                </div>
              )}
              {description?.Birthplace && (
                <div>
                  <span className="block text-neutral-300 text-xs">
                    Tempat Lahir
                  </span>
                  <span className="font-medium">{description.Birthplace}</span>
                </div>
              )}
              {description?.Birthday && (
                <div>
                  <span className="block text-neutral-300 text-xs">
                    Tanggal Lahir
                  </span>
                  <span className="font-medium">{description.Birthday}</span>
                </div>
              )}
              {description?.['Blood type'] && (
                <div>
                  <span className="block text-neutral-300 text-xs">
                    Golongan Darah
                  </span>
                  <span className="font-medium">
                    {description['Blood type']}
                  </span>
                </div>
              )}
              {description?.['Zodiac signs'] && (
                <div>
                  <span className="block text-neutral-300 text-xs">Zodiak</span>
                  <span className="font-medium">
                    {description['Zodiac signs']}
                  </span>
                </div>
              )}
              {description?.Hobby && (
                <div>
                  <span className="block text-neutral-300 text-xs">Hobi</span>
                  <span className="font-medium">{description.Hobby}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className="mb-10">
          <Title text="Room Info" />
          <div className="space-y-4">
            {data?.genre_name && (
              <div>
                <span className="block text-neutral-300 text-xs">Kategori</span>
                <span className="font-medium">{data.genre_name}</span>
              </div>
            )}
            {data?.room_level && (
              <div>
                <span className="block text-neutral-300 text-xs">
                  Room Level
                </span>
                <span className="font-medium">{data.room_level}</span>
              </div>
            )}
            {data.follower_num && (
              <div>
                <span className="block text-neutral-300 text-xs">
                  Jumlah Follower
                </span>
                <span className="font-medium">{data.follower_num}</span>
              </div>
            )}
          </div>
        </div>
      )}
      {data && (
        <div>
          <Title text="Fans Letter" />
          <div>
            {data.recommend_comment_list.map((comment) => (
              <div
                key={comment.created_at}
                className="flex items-start gap-4 border-b border-slate-700 py-4"
              >
                <img
                  src={comment.user.image}
                  alt={comment.user.name}
                  className="w-10"
                />
                <div>
                  <h4 className="font-bold">{comment.user.name}</h4>
                  <p className="text-sm text-neutral-500">
                    {toHumanDate(comment.created_at)}
                  </p>
                  <p className="mt-2">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetails;
