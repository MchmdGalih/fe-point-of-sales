<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Timer } from "lucide-vue-next";
import { Check, Circle, Dot } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import type { OrderStatus } from "@/types/order";
import { ORDER_STEPS } from "@/const/order";
import { computed } from "vue";

const props = defineProps<{
  status: OrderStatus | null;
}>();

const currentStep = computed(() => {
  switch (props.status) {
    case "PENDING":
      return 1;
    case "COMPLETED":
      return 2;
    default:
      return 1;
  }
});

const getStepState = (step: number) => {
  const status = props.status;

  if (status === "COMPLETED") {
    return "completed";
  }

  if (step < currentStep.value) {
    return "completed";
  }

  if (step === currentStep.value) {
    return "active";
  }

  return "inactive";
};

const getSeparatorClass = (step: number) => {
  return step < currentStep.value ? "bg-primary" : "bg-muted";
};
</script>

<template>
  <Card class="px-4 gap-3">
    <div class="flex items-center gap-x-2 mb-2">
      <Timer />
      <h4 class="font-semibold">Timeline</h4>
    </div>
    <Stepper
      orientation="vertical"
      class="mx-auto flex w-full max-w-md flex-col justify-start gap-10"
    >
      <StepperItem
        v-for="step in ORDER_STEPS"
        :key="step.step"
        v-slot="{ state }"
        class="relative flex w-full items-start gap-6"
        :step="step.step"
      >
        <StepperSeparator
          v-if="step.step !== ORDER_STEPS[ORDER_STEPS.length - 1]?.step"
          class="absolute left-4.5 top-9.5 block h-[105%] w-0.5 shrink-0 rounded-full"
          :class="getSeparatorClass(step.step)"
        />
        <StepperTrigger as-child>
          <Button
            :variant="
              getStepState(step.step) === 'completed' ||
              getStepState(step.step) === 'active'
                ? 'default'
                : 'outline'
            "
            size="icon"
            class="z-10 rounded-full shrink-0"
          >
            <Check
              v-if="getStepState(step.step) === 'completed'"
              class="size-5"
            />
            <Circle
              v-else-if="getStepState(step.step) === 'active'"
              class="size-4"
            />
            <Dot v-else />
          </Button>
        </StepperTrigger>
        <div class="flex flex-col gap-1">
          <StepperTitle
            :class="getStepState(step.step) === 'active' && 'text-primary'"
            class="text-sm font-semibold transition lg:text-base"
          >
            {{ step.title }}
          </StepperTitle>
          <StepperDescription
            :class="[state === 'active' && 'text-primary']"
            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
          >
            {{ step.description }}
          </StepperDescription>
        </div>
      </StepperItem>
    </Stepper>
  </Card>
</template>
