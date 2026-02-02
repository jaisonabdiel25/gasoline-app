import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
    avatarUrl: string
}

export const  CustomAvatar = (props: Props) =>  {

    const {avatarUrl} = props;
  return (
    <Avatar>
      <AvatarImage
        src={avatarUrl}
        alt="@shadcn"
        className="grayscale"
      />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  )
}
