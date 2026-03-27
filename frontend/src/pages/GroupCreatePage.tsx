import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { SelectField } from '../components/ui/SelectField'
import { TextareaField } from '../components/ui/TextareaField'
import { createGroup } from '../services/groups'
import { ROUTES } from '../routes/route-paths'
import type { CreateGroupRequest, GroupCategory } from '../types/group'
import { getErrorMessage } from '../utils/error'

const categoryOptions: GroupCategory[] = ['SPORTS', 'STUDY', 'CULTURE', 'TRAVEL', 'ETC']

export function GroupCreatePage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateGroupRequest>({
    defaultValues: {
      category: 'SPORTS',
      maxMembers: 10,
      isPublic: true,
    },
  })

  const createMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: (result) => navigate(ROUTES.groupDetail(result.groupId)),
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Create Group"
        title="모임 만들기"
        description="모임 이름, 설명, 카테고리, 지역, 정원, 공개 여부를 입력해 새 모임을 생성합니다."
      />

      <form className="grid gap-5" onSubmit={handleSubmit((values) => createMutation.mutate(values))}>
        <InputField
          id="name"
          label="모임 이름"
          error={errors.name?.message}
          {...register('name', { required: '모임 이름을 입력하세요.' })}
        />
        <TextareaField
          id="description"
          label="모임 설명"
          error={errors.description?.message}
          {...register('description', { required: '모임 설명을 입력하세요.' })}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            label="카테고리"
            error={errors.category?.message}
            {...register('category', { required: '카테고리를 선택하세요.' })}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectField>
          <InputField
            id="maxMembers"
            label="최대 인원"
            type="number"
            error={errors.maxMembers?.message}
            {...register('maxMembers', {
              required: '최대 인원을 입력하세요.',
              valueAsNumber: true,
              min: { value: 2, message: '최대 인원은 2명 이상이어야 합니다.' },
            })}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            id="region"
            label="지역"
            error={errors.region?.message}
            {...register('region', { required: '지역을 입력하세요.' })}
          />
          <SelectField
            label="공개 여부"
            error={errors.isPublic?.message}
            {...register('isPublic', {
              setValueAs: (value) => value === 'true',
            })}
          >
            <option value="true">공개 모임</option>
            <option value="false">비공개 모임</option>
          </SelectField>
        </div>
        {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
        <Button type="submit" className="w-full md:w-fit" disabled={createMutation.isPending}>
          {createMutation.isPending ? '생성 중...' : '모임 생성'}
        </Button>
      </form>
    </section>
  )
}
