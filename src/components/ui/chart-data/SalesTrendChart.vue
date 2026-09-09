<script setup lang="ts">
import type { SalesTrendItem } from "@/types/dashboard";

import { formatDate } from "@/utils/format-date";
import {
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
  type ChartConfig,
} from "@/components/ui/chart";
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";

interface Props {
  data: SalesTrendItem[];
  config: ChartConfig;
  dateFormatOptions: Intl.DateTimeFormatOptions;
}

const props = defineProps<Props>();
</script>

<template>
  <VisXYContainer
    :data="data"
    :margin="{
      top: 10,
      right: 10,
      bottom: 40,
      left: 40,
    }"
    class="w-full min-w-0"
  >
    <VisGroupedBar
      :x="(d: SalesTrendItem) => d.date"
      :y="[
        (d: SalesTrendItem) => d.revenue,
        (d: SalesTrendItem) => d.totalOrders,
      ]"
      :color="[config.totalOrders.color, config.revenue.color]"
      :bar-padding="0.2"
      :rounded-corners="4"
      :group-padding="0.2"
    />
    <VisAxis
      type="x"
      :x="(d: SalesTrendItem) => d.date"
      :tick-line="false"
      :domain-line="false"
      :grid-line="false"
      :tick-values="data.map((d) => d.date)"
      :tick-format="
        (d: number) => {
          return formatDate(d, dateFormatOptions);
        }
      "
    />
    <VisAxis type="y" />

    <ChartTooltip />
    <ChartCrosshair
      :template="
        componentToString(config, ChartTooltipContent, {
          labelFormatter(d: number | Date) {
            return formatDate(d, dateFormatOptions);
          },
        })
      "
      :color="[config.revenue.color, config.totalOrders.color]"
    />
    <ChartLegendContent />
  </VisXYContainer>
</template>
