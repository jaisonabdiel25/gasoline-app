import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface Props {
    avatarUrl: string
    className?: string;
}

export const  CustomAvatar = (props: Props) =>  {

    const {avatarUrl, className} = props;
  return (
    <Avatar className={className}>
      <AvatarImage
        src={avatarUrl}
        alt="@shadcn"
      />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  )
}
