"use client";
// 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
import { Heading } from "@/components/custom/heading";
import { MessagesSquare, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";

// import { BotAvatar } from "@/components/bot-avatar";
// import { Heading } from "@/components/heading";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { Loader } from "@/components/loader";
// import { UserAvatar } from "@/components/user-avatar";
// import { Empty } from "@/components/ui/empty";
// import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./contants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/custom/empty";
import { Loader } from "@/components/custom/loder";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/custom/user-avatar";
import { BotAvatar } from "@/components/custom/bot-avatar";

const MusicPage = () => {
  const router = useRouter();
  // const proModal = useProModal();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);
      console.log(response);

      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music"
        description="Music Generation"
        icon={Music}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Piano Solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {!music && !isLoading && <Empty label="No music generated." />}
            {music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
