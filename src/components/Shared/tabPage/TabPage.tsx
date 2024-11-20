"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TabPageProps {
    tabs: { label: string; value: string; icon: JSX.Element; component: React.ReactNode }[];
    defaultTab: string;
}

export default function TabPage({ tabs, defaultTab }: TabPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<string>(searchParams.get("tab") ?? defaultTab);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    // Update breadcrumb dynamically based on tab
    useEffect(() => {
        const path = searchParams.get("tab")?.split("/") || [];
        setBreadcrumbs(path);
    }, [searchParams]);

    const handleTab = (category: string) => {
        setTab(category);
        const params = new URLSearchParams(searchParams?.toString());
        params.set("tab", category);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dashboard-containers">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="py-2">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Settings</span>
                        <span className="text-gray-500">{'>'}</span>
                        {/* Loop through breadcrumbs and display */}
                        {breadcrumbs.map((breadcrumb, index) => (
                            <span key={index} className="text-gray-500 capitalize">
                                {breadcrumb}
                                {index < breadcrumbs.length - 1 && <span className="mx-2">{'>'}</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t ">
                <Tabs defaultValue={tab} className="grid sm:grid-cols-6 xl:grid-cols-5 min-h-screen">
                    <div className="pt-4 col-span-2 xl:col-span-1 sm:border-r sm:w-full  h-full sticky left-0 right-0 z-30 sm:block top-[49px]">
                        <TabsList className="sm:flex sm:flex-col  items-start justify-center sm:justify-start sm:pr-4 sm:sticky sm:top-20 top-16 bg-white xl:block min-h-14 z-30">
                            {tabs.map((tabItem) => (
                                <TabsTrigger
                                    key={tabItem.value}
                                    onClick={() => handleTab(tabItem.value)}
                                    className="sm:text-base w-full"
                                    value={tabItem.value}
                                >
                                    {tabItem.icon}
                                    {tabItem.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    <div className="col-span-4 pt-4 z-20">
                        {tabs.map((tabItem) => (
                            <TabsContent key={tabItem.value} value={tabItem.value}>
                                {tabItem.component}
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
