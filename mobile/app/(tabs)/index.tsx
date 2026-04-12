import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResidentHomeScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View className="flex-1 bg-gunmetal-950">
      <ScrollView 
        className="flex-1"
        contentContainerClassName="pb-32 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for sticky header */}
        <View style={{ height: insets.top + 80 }} />

        {/* Active Pass Section */}
        <View className="mb-10">
          <Text variant="caption" className="font-bold uppercase text-secondary mb-3">Current Active Pass</Text>
          <Card variant="glass" className="p-6 relative overflow-hidden">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text variant="h4" className="text-white mb-1">Rajesh Kumar - Delivery</Text>
                <View className="flex-row items-center gap-1.5 opacity-80">
                  <Icon name="schedule" size={14} color="#9babce" />
                  <Text className="text-secondary text-[13px]">Valid until 18:45 PM</Text>
                </View>
              </View>
              <View className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <Icon name="qr-code-2" size={28} color="#e5e5e5" />
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-gunmetal-light/80 items-center justify-center border border-white/10">
                  <Icon name="local-shipping" size={16} color="#d4d4d4" />
                </View>
                <View className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                  <Text className="text-[10px] font-bold tracking-widest uppercase text-white">Active</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-[11px] font-bold text-secondary">View Details</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Quick Actions Bento */}
        <View className="mb-10">
          <Text variant="caption" className="font-bold uppercase text-secondary mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Main Action */}
            <TouchableOpacity activeOpacity={0.9} className="w-full mb-4 bg-gunmetal-light p-5 rounded-[24px] h-32 justify-between border border-white/5 shadow-xl">
              <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                <Icon name="add" size={24} color="#FFF" />
              </View>
              <Text className="text-white font-semibold pr-10">Create One-Time Pass</Text>
            </TouchableOpacity>

            <View className="w-[48%]">
              <Card variant="glass" className="h-[120px] p-4 justify-between items-start">
                <Icon name="verified-user" size={28} color="#9babce" />
                <Text className="text-sm font-semibold text-slate-200 leading-tight">Pre-approve Guest</Text>
              </Card>
            </View>
            <View className="w-[48%]">
              <Card variant="glass" className="h-[120px] p-4 justify-between items-start">
                <Icon name="engineering" size={28} color="#9babce" />
                <Text className="text-sm font-semibold text-slate-200 leading-tight">Daily Help</Text>
              </Card>
            </View>
          </View>
        </View>

        {/* Recent Visitors */}
        <View className="mb-10">
          <View className="flex-row justify-between items-center mb-3">
            <Text variant="caption" className="font-bold uppercase text-secondary">Recent Visitors</Text>
            <TouchableOpacity>
              <Text className="text-[11px] font-medium text-secondary">See all history</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            {[1, 2].map((_, i) => (
              <Card key={i} variant="glass" className="p-4 flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-4">
                  <View className="w-12 h-12 rounded-2xl bg-white/5 items-center justify-center border border-white/5">
                    <Icon name={i === 0 ? "person" : "home-repair-service"} color="#d4d4d4" />
                  </View>
                  <View>
                    <Text className="font-semibold text-white text-[15px] mb-1">
                      {i === 0 ? "Ananya Sharma" : "Kiran Plumbing Services"}
                    </Text>
                    <Text className="text-[12px] text-secondary opacity-80">
                      Today, {i === 0 ? "14:20 PM" : "10:05 AM"}
                    </Text>
                  </View>
                </View>
                <View className="px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <Text className="text-[9px] font-bold tracking-widest uppercase text-secondary">
                    {i === 0 ? "SCANNED" : "APPROVED"}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Community Notice Banner */}
        <View className="mb-8">
          <Card variant="glass" className="p-6 border-slate-700/30">
            <View className="flex-row items-center gap-2 mb-3">
              <Icon name="campaign" size={16} color="#9babce" />
              <Text className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Notice Board</Text>
            </View>
            <Text className="text-[15px] font-semibold text-white mb-2">Annual Fire Drill - Sunday, 10 AM</Text>
            <Text className="text-[13px] text-secondary leading-relaxed opacity-80">
              Participation is mandatory for all residents of Tower A and B. Please assemble at the main lawn.
            </Text>
          </Card>
        </View>
      </ScrollView>

      {/* Sticky Header with Blur */}
      <BlurView 
        intensity={40} 
        tint="dark" 
        className="absolute top-0 w-full border-b border-white/5"
        style={{ paddingTop: Math.max(insets.top, 20), paddingBottom: 16 }}
      >
        <SafeAreaView className="flex-row items-center justify-between px-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-slate-800">
              {/* Profile Image missing local asset right now, use solid color */}
              <View className="flex-1 bg-surface-bright" />
            </View>
            <View className="justify-center">
              <Text className="text-sm font-bold tracking-tight text-white mb-0.5">Arjun Mehta</Text>
              <Text className="text-[9px] uppercase tracking-[0.2em] text-secondary font-semibold">Tower A - 402</Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-1">
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
              <Icon name="notifications" color="#e2e8f0" />
              <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-yellow-400 border border-gunmetal-950" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
              <Icon name="menu" color="#e2e8f0" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}
